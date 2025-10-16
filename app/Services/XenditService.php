<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Models\Payment;
use Illuminate\Support\Str;

class XenditService
{
    protected $secretKey;
    protected $baseUrl;

    public function __construct()
    {
        $this->secretKey = config('services.xendit.secret_key');
        $this->baseUrl = config('services.xendit.api_base');
    }

    /**
     * Membuat Virtual Account baru untuk pembayaran denda
     */
    public function createVirtualAccount($amount, $user, $borrowing)
    {
        $externalId = 'fine_' . $borrowing->id . '_' . Str::random(6);

        // Simpan dulu ke tabel payments
        $payment = Payment::create([
            'user_id' => $user->id,
            'borrowing_id' => $borrowing->id,
            'external_id' => $externalId,
            'amount' => $amount,
            'status' => 'pending',
        ]);

        // Kirim request ke Xendit
        $response = Http::withBasicAuth($this->secretKey, '')
            ->post("{$this->baseUrl}/callback_virtual_accounts", [
                'external_id' => $externalId,
                'bank_code' => 'BCA', // bisa diganti BNI, BRI, Mandiri, dll
                'name' => $user->name,
                'expected_amount' => $amount,
                'is_closed' => true,
            ]);

        if ($response->failed()) {
            $payment->update(['status' => 'failed']);
            throw new \Exception('Gagal membuat Virtual Account Xendit: ' . $response->body());
        }

        $data = $response->json();

        $payment->update([
            'reference_id' => $data['id'] ?? null,
            'metadata' => $data,
        ]);

        return $data;
    }

    /**
     * Menangani callback dari Xendit (pembayaran sukses)
     */
    public function handleCallback($payload, $token)
    {
        // Verifikasi token keamanan
        if ($token !== config('services.xendit.callback_token')) {
            abort(403, 'Invalid callback token');
        }

        $externalId = $payload['external_id'] ?? null;
        $status = $payload['status'] ?? 'PENDING';

        if (!$externalId) {
            abort(400, 'Missing external_id');
        }

        $payment = Payment::where('external_id', $externalId)->first();
        if (!$payment) {
            abort(404, 'Payment not found');
        }

        if ($status === 'PAID') {
            $payment->update(['status' => 'paid']);

            // Update juga borrowings biar denda dianggap lunas
            $borrowing = $payment->borrowing;
            if ($borrowing && $borrowing->fine_amount > 0) {
                $borrowing->update(['fine_amount' => 0]);
            }
        } elseif (in_array($status, ['FAILED', 'EXPIRED'])) {
            $payment->update(['status' => 'failed']);
        }

        return response()->json(['message' => 'Callback processed']);
    }
}
