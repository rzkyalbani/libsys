<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'author',
        'isbn',
        'total_copies',
        'available_copies',
        'cover_image',
        'file_path',
        'description',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the cover image URL with fallback
     */
    public function getCoverImageAttribute()
    {
        $value = $this->attributes['cover_image'] ?? null;

        if ($value) {
            // Check if value is already a complete URL
            if (filter_var($value, FILTER_VALIDATE_URL)) {
                return $value;
            }

            // If it's a relative path (like 'book_covers/filename.jpg'), use Storage::url to generate the full URL
            // Storage::url() automatically creates URLs like 'http://yoursite.com/storage/book_covers/filename.jpg'
            // This assumes storage is properly linked with 'php artisan storage:link'
            return Storage::url($value);
        }

        // Fallback to a default cover image
        return asset('images/default-book-cover.png');
    }
}
