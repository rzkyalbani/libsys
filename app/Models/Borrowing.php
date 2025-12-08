<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Setting;

class Borrowing extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'book_id',
        'status',
        'borrow_date',
        'due_date',
        'return_date',
        'fine_amount',
        'is_fine_paid',
        'fine_paid_at',
    ];

    protected $casts = [
        'borrow_date' => 'date',
        'due_date'    => 'date', 
        'return_date' => 'date',
        'fine_paid_at' => 'date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    /**
     * Menghitung jumlah hari keterlambatan berdasarkan tanggal jatuh tempo
     *
     * @param \DateTimeInterface|null $returnDate Tanggal pengembalian (jika null, gunakan sekarang)
     * @return int Jumlah hari keterlambatan (selalu positif atau nol)
     */
    public function calculateLateDays($returnDate = null)
    {
        $returnDate = $returnDate ?: now();

        // Konversi ke Carbon dan set ke awal hari untuk menghitung perbedaan hari penuh
        $dueDate = $this->due_date->startOfDay();
        $returnDate = $returnDate->startOfDay();

        // Kita ingin tahu berapa hari setelah due_date buku dikembalikan
        // Jika returnDate > dueDate, maka ada keterlambatan
        if ($returnDate->gt($dueDate)) {
            // Hitung selisih hari secara eksplisit
            // diffInDays menghitung jumlah hari penuh antara dua tanggal
            return $dueDate->diffInDays($returnDate);
        }

        // Jika tidak terlambat, kembalikan 0
        return 0;
    }

    /**
     * Menghitung jumlah denda berdasarkan hari keterlambatan
     *
     * @param \DateTimeInterface|null $returnDate Tanggal pengembalian (jika null, gunakan sekarang)
     * @return int Jumlah denda dalam rupiah (positif menandakan denda terutang)
     */
    public function calculateFine($returnDate = null)
    {
        $fineRate = (int) Setting::get('fine_rate_per_day', 1000);
        $daysLate = $this->calculateLateDays($returnDate);

        // Denda = jumlah hari terlambat * tarif denda per hari
        $fine = $daysLate * $fineRate;

        // Kembalikan sebagai nilai positif jika terlambat (menandakan denda terutang)
        return $daysLate > 0 ? $fine : 0;
    }
}
