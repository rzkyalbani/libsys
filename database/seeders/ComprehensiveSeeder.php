<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Borrowing;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Payment;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ComprehensiveSeeder extends Seeder
{
    /**
     * Run the database seeds with comprehensive data for testing.
     */
    public function run(): void
    {
        // Create additional admin users (avoid conflicts with existing admin)
        $adminEmails = ['librarian1@test.example', 'librarian2@test.example'];
        $existingAdmin = User::where('email', 'admin@test.example')->first();

        $admin1 = User::firstOrCreate(
            ['email' => 'librarian1@test.example'],
            [
                'name' => 'Librarian 1',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        $admin2 = User::firstOrCreate(
            ['email' => 'librarian2@test.example'],
            [
                'name' => 'Librarian 2',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        // Create regular members
        $member1 = User::firstOrCreate(
            ['email' => 'john.doe@example.com'],
            [
                'name' => 'John Doe',
                'password' => Hash::make('password'),
                'role' => 'member',
            ]
        );

        $member2 = User::firstOrCreate(
            ['email' => 'jane.smith@example.com'],
            [
                'name' => 'Jane Smith',
                'password' => Hash::make('password'),
                'role' => 'member',
            ]
        );

        $member3 = User::firstOrCreate(
            ['email' => 'robert.j@example.com'],
            [
                'name' => 'Robert Johnson',
                'password' => Hash::make('password'),
                'role' => 'member',
            ]
        );

        $member4 = User::firstOrCreate(
            ['email' => 'emily.d@example.com'],
            [
                'name' => 'Emily Davis',
                'password' => Hash::make('password'),
                'role' => 'member',
            ]
        );

        $member5 = User::firstOrCreate(
            ['email' => 'michael.w@example.com'],
            [
                'name' => 'Michael Wilson',
                'password' => Hash::make('password'),
                'role' => 'member',
            ]
        );

        $members = [$member1, $member2, $member3, $member4, $member5];

        // Create additional categories if they don't exist already
        $existingCategories = Category::pluck('name')->toArray();

        $additionalCategories = [
            ['name' => 'Pendidikan', 'description' => 'Buku pendidikan dan pelajaran'],
            ['name' => 'Agama', 'description' => 'Buku keagamaan dan spiritualitas'],
            ['name' => 'Bisnis', 'description' => 'Buku tentang bisnis dan ekonomi'],
            ['name' => 'Seni & Desain', 'description' => 'Buku tentang seni dan desain'],
            ['name' => 'Hukum', 'description' => 'Buku hukum dan perundang-undangan'],
            ['name' => 'Kesehatan', 'description' => 'Buku kesehatan dan kedokteran'],
            ['name' => 'Psikologi', 'description' => 'Buku psikologi dan pengembangan diri'],
        ];

        foreach ($additionalCategories as $category) {
            if (!in_array($category['name'], $existingCategories)) {
                Category::create($category);
            }
        }

        // Get all categories after ensuring they exist
        $categories = Category::all();

        // Create books for each category
        $books = [];

        // Teknologi category
        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Teknologi')->first()->id,
            'title' => 'Clean Code: A Handbook of Agile Software Craftsmanship',
            'author' => 'Robert C. Martin',
            'isbn' => '978-0132350884',
            'total_copies' => 3,
            'available_copies' => 2,
            'description' => 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees.',
        ]);

        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Teknologi')->first()->id,
            'title' => 'Design Patterns: Elements of Reusable Object-Oriented Software',
            'author' => 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
            'isbn' => '978-0201633612',
            'total_copies' => 2,
            'available_copies' => 1,
            'description' => 'Captures the experience of experts in designing object-oriented software.',
        ]);

        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Teknologi')->first()->id,
            'title' => 'You Don\'t Know JS (book series)',
            'author' => 'Kyle Simpson',
            'isbn' => '978-1491904244',
            'total_copies' => 4,
            'available_copies' => 3,
            'description' => 'Deep dive into core JavaScript concepts.',
        ]);

        // Fiksi category
        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Fiksi')->first()->id,
            'title' => 'To Kill a Mockingbird',
            'author' => 'Harper Lee',
            'isbn' => '978-0061120084',
            'total_copies' => 3,
            'available_copies' => 2,
            'description' => 'A gripping tale of race and injustice in the American South.',
        ]);

        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Fiksi')->first()->id,
            'title' => '1984',
            'author' => 'George Orwell',
            'isbn' => '978-0451524935',
            'total_copies' => 5,
            'available_copies' => 4,
            'description' => 'A dystopian social science fiction novel and cautionary tale about the future.',
        ]);

        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Fiksi')->first()->id,
            'title' => 'Pride and Prejudice',
            'author' => 'Jane Austen',
            'isbn' => '978-0141439518',
            'total_copies' => 2,
            'available_copies' => 1,
            'description' => 'A romantic novel of manners written by Jane Austen.',
        ]);

        // Sains category
        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Sains')->first()->id,
            'title' => 'A Brief History of Time',
            'author' => 'Stephen Hawking',
            'isbn' => '978-0553380163',
            'total_copies' => 3,
            'available_copies' => 2,
            'description' => 'A landmark volume in science writing by one of the great minds of our time.',
        ]);

        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Sains')->first()->id,
            'title' => 'The Theory of Everything',
            'author' => 'Stephen Hawking',
            'isbn' => '978-1891396392',
            'total_copies' => 2,
            'available_copies' => 1,
            'description' => 'Explores the ultimate questions of science: who are we?',
        ]);

        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Sains')->first()->id,
            'title' => 'The Origin of Species',
            'author' => 'Charles Darwin',
            'isbn' => '978-1509859105',
            'total_copies' => 2,
            'available_copies' => 2,
            'description' => 'Darwin\'s book on the scientific theory of evolution by natural selection.',
        ]);

        // Sejarah category
        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Sejarah')->first()->id,
            'title' => 'Sapiens: A Brief History of Humankind',
            'author' => 'Yuval Noah Harari',
            'isbn' => '978-0062316097',
            'total_copies' => 3,
            'available_copies' => 2,
            'description' => 'A brief history of humankind from the evolution of man to the present day.',
        ]);

        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Sejarah')->first()->id,
            'title' => 'The Guns of August',
            'author' => 'Barbara Tuchman',
            'isbn' => '978-0345476823',
            'total_copies' => 2,
            'available_copies' => 1,
            'description' => 'A classic account of the outbreak of World War I.',
        ]);

        // Pendidikan category
        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Pendidikan')->first()->id,
            'title' => 'The Art of Learning',
            'author' => 'Josh Waitzkin',
            'isbn' => '978-0743277464',
            'total_copies' => 2,
            'available_copies' => 2,
            'description' => 'A journey in learning and the art of peak performance.',
        ]);

        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Pendidikan')->first()->id,
            'title' => 'Thinking, Fast and Slow',
            'author' => 'Daniel Kahneman',
            'isbn' => '978-0374533557',
            'total_copies' => 3,
            'available_copies' => 2,
            'description' => 'A revolutionary book that explains how people make decisions.',
        ]);

        // Agama category
        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Agama')->first()->id,
            'title' => 'The Quran',
            'author' => 'Various',
            'isbn' => '978-1565644443',
            'total_copies' => 5,
            'available_copies' => 3,
            'description' => 'The central religious text of Islam, believed by Muslims to be the word of God.',
        ]);

        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Agama')->first()->id,
            'title' => 'The Bible',
            'author' => 'Various authors',
            'isbn' => '978-0606308886',
            'total_copies' => 4,
            'available_copies' => 2,
            'description' => 'The Christian holy book, comprising the Old and New Testaments.',
        ]);

        // Additional books for other categories
        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Bisnis')->first()->id,
            'title' => 'Rich Dad Poor Dad',
            'author' => 'Robert Kiyosaki',
            'isbn' => '978-1612680194',
            'total_copies' => 3,
            'available_copies' => 1,
            'description' => 'A simple way to learn about money and investing.',
        ]);

        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Seni & Desain')->first()->id,
            'title' => 'The Elements of Style',
            'author' => 'William Strunk Jr.',
            'isbn' => '978-0205309023',
            'total_copies' => 2,
            'available_copies' => 2,
            'description' => 'A classic guide to English language usage and writing.',
        ]);

        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Hukum')->first()->id,
            'title' => 'Constitution of the United States',
            'author' => 'U.S. Government',
            'isbn' => '978-0486406163',
            'total_copies' => 3,
            'available_copies' => 3,
            'description' => 'The foundational legal document of the United States government.',
        ]);

        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Kesehatan')->first()->id,
            'title' => 'The China Study',
            'author' => 'T. Colin Campbell',
            'isbn' => '978-1932603106',
            'total_copies' => 2,
            'available_copies' => 1,
            'description' => 'The most comprehensive study of nutrition ever conducted.',
        ]);

        $books[] = Book::create([
            'category_id' => $categories->where('name', 'Psikologi')->first()->id,
            'title' => 'Man\'s Search for Meaning',
            'author' => 'Viktor E. Frankl',
            'isbn' => '978-0807014295',
            'total_copies' => 3,
            'available_copies' => 2,
            'description' => 'A logotherapy memoir by the neurologist and psychiatrist Viktor Frankl.',
        ]);

        // Create borrowings
        $borrowings = [];
        
        // Borrowings by member1 (John Doe)
        $borrowings[] = Borrowing::create([
            'user_id' => $member1->id,
            'book_id' => $books[0]->id, // Clean Code
            'status' => 'returned',
            'borrow_date' => Carbon::now()->subDays(15),
            'due_date' => Carbon::now()->subDays(8),
            'return_date' => Carbon::now()->subDays(7),
            'fine_amount' => 7000, // 7 days * 1000/day
            'is_fine_paid' => true,
            'fine_paid_at' => Carbon::now()->subDays(7),
        ]);

        $borrowings[] = Borrowing::create([
            'user_id' => $member1->id,
            'book_id' => $books[3]->id, // To Kill a Mockingbird
            'status' => 'returned',
            'borrow_date' => Carbon::now()->subDays(12),
            'due_date' => Carbon::now()->subDays(5),
            'return_date' => Carbon::now()->subDays(4),
            'fine_amount' => 1000, // 1 day * 1000/day
            'is_fine_paid' => true,
            'fine_paid_at' => Carbon::now()->subDays(4),
        ]);

        // Borrowings by member2 (Jane Smith)
        $borrowings[] = Borrowing::create([
            'user_id' => $member2->id,
            'book_id' => $books[1]->id, // Design Patterns
            'status' => 'borrowed',
            'borrow_date' => Carbon::now()->subDays(5),
            'due_date' => Carbon::now()->subDays(2),
            'fine_amount' => 3000, // 3 days late * 1000/day
            'is_fine_paid' => false,
        ]);

        $borrowings[] = Borrowing::create([
            'user_id' => $member2->id,
            'book_id' => $books[4]->id, // 1984
            'status' => 'returned',
            'borrow_date' => Carbon::now()->subDays(14),
            'due_date' => Carbon::now()->subDays(7),
            'return_date' => Carbon::now()->subDays(6),
            'fine_amount' => 1000, // 1 day late * 1000/day
            'is_fine_paid' => true,
            'fine_paid_at' => Carbon::now()->subDays(6),
        ]);

        // Borrowings by member3 (Robert Johnson)
        $borrowings[] = Borrowing::create([
            'user_id' => $member3->id,
            'book_id' => $books[2]->id, // You Don't Know JS
            'status' => 'borrowed',
            'borrow_date' => Carbon::now()->subDays(2),
            'due_date' => Carbon::now()->addDays(5),
            'fine_amount' => 0,
            'is_fine_paid' => false,
        ]);

        $borrowings[] = Borrowing::create([
            'user_id' => $member3->id,
            'book_id' => $books[6]->id, // A Brief History of Time
            'status' => 'borrowed',
            'borrow_date' => Carbon::now()->subDays(3),
            'due_date' => Carbon::now()->subDays(1),
            'fine_amount' => 2000, // 2 days late * 1000/day
            'is_fine_paid' => false,
        ]);

        // Borrowings by member4 (Emily Davis)
        $borrowings[] = Borrowing::create([
            'user_id' => $member4->id,
            'book_id' => $books[5]->id, // Pride and Prejudice
            'status' => 'returned',
            'borrow_date' => Carbon::now()->subDays(10),
            'due_date' => Carbon::now()->subDays(3),
            'return_date' => Carbon::now()->subDays(3),
            'fine_amount' => 0,
            'is_fine_paid' => true,
            'fine_paid_at' => Carbon::now()->subDays(3),
        ]);

        $borrowings[] = Borrowing::create([
            'user_id' => $member4->id,
            'book_id' => $books[8]->id, // The Origin of Species
            'status' => 'returned',
            'borrow_date' => Carbon::now()->subDays(18),
            'due_date' => Carbon::now()->subDays(11),
            'return_date' => Carbon::now()->subDays(9),
            'fine_amount' => 2000, // 2 days late * 1000/day
            'is_fine_paid' => true,
            'fine_paid_at' => Carbon::now()->subDays(9),
        ]);

        // Borrowings by member5 (Michael Wilson)
        $borrowings[] = Borrowing::create([
            'user_id' => $member5->id,
            'book_id' => $books[9]->id, // Sapiens
            'status' => 'returned',
            'borrow_date' => Carbon::now()->subDays(20),
            'due_date' => Carbon::now()->subDays(13),
            'return_date' => Carbon::now()->subDays(10),
            'fine_amount' => 3000, // 3 days late * 1000/day
            'is_fine_paid' => true,
            'fine_paid_at' => Carbon::now()->subDays(10),
        ]);

        $borrowings[] = Borrowing::create([
            'user_id' => $member5->id,
            'book_id' => $books[12]->id, // The Art of Learning
            'status' => 'borrowed',
            'borrow_date' => Carbon::now()->subDays(1),
            'due_date' => Carbon::now()->addDays(6),
            'fine_amount' => 0,
            'is_fine_paid' => false,
        ]);

        // Create reservations
        $reservations = [];
        
        $reservations[] = Reservation::create([
            'user_id' => $member2->id,
            'book_id' => $books[0]->id, // Clean Code
            'status' => 'notified',
            'notified_at' => Carbon::now()->subHours(2),
        ]);

        $reservations[] = Reservation::create([
            'user_id' => $member4->id,
            'book_id' => $books[1]->id, // Design Patterns
            'status' => 'waiting',
        ]);

        $reservations[] = Reservation::create([
            'user_id' => $member5->id,
            'book_id' => $books[3]->id, // To Kill a Mockingbird
            'status' => 'waiting',
        ]);

        $reservations[] = Reservation::create([
            'user_id' => $member1->id,
            'book_id' => $books[10]->id, // The Guns of August
            'status' => 'waiting',
        ]);

        // Create payments for fines that need to be paid
        $unpaidBorrowings = collect($borrowings)->filter(function ($borrowing) {
            return !$borrowing->is_fine_paid && $borrowing->fine_amount > 0;
        });

        foreach ($unpaidBorrowings as $borrowing) {
            // Create a pending payment for each unpaid fine
            Payment::create([
                'user_id' => $borrowing->user_id,
                'borrowing_id' => $borrowing->id,
                'external_id' => 'fine_' . $borrowing->id . '_' . Str::random(8),
                'gateway' => 'xendit',
                'reference_id' => 'inv_' . Str::random(10),
                'amount' => $borrowing->fine_amount,
                'status' => 'pending',
                'metadata' => json_encode([
                    'description' => 'Payment for overdue book: ' . $borrowing->book->title,
                    'book_title' => $borrowing->book->title
                ]),
            ]);

            // Create a paid payment for each previously paid fine
            if ($borrowing->is_fine_paid) {
                Payment::create([
                    'user_id' => $borrowing->user_id,
                    'borrowing_id' => $borrowing->id,
                    'external_id' => 'fine_' . $borrowing->id . '_' . Str::random(8) . '_paid',
                    'gateway' => 'xendit',
                    'reference_id' => 'inv_' . Str::random(10),
                    'amount' => $borrowing->fine_amount,
                    'status' => 'paid',
                    'metadata' => json_encode([
                        'description' => 'Payment for overdue book: ' . $borrowing->book->title,
                        'book_title' => $borrowing->book->title,
                        'paid_at' => $borrowing->fine_paid_at
                    ]),
                ]);
            }
        }

        // Create additional paid payments for the returned books that had fines
        $returnedWithFines = collect($borrowings)->filter(function ($borrowing) {
            return $borrowing->status === 'returned' && $borrowing->is_fine_paid && $borrowing->fine_amount > 0;
        });

        // Create additional paid payments for other returned books with fines
        $allBorrowings = Borrowing::where('is_fine_paid', true)->where('fine_amount', '>', 0)->get();
        foreach ($allBorrowings as $borrowing) {
            // Check if payment already exists for this borrowing
            $existingPayment = Payment::where('borrowing_id', $borrowing->id)->first();
            if (!$existingPayment) {
                Payment::create([
                    'user_id' => $borrowing->user_id,
                    'borrowing_id' => $borrowing->id,
                    'external_id' => 'fine_' . $borrowing->id . '_' . Str::random(8) . '_paid',
                    'gateway' => 'xendit',
                    'reference_id' => 'inv_' . Str::random(10),
                    'amount' => $borrowing->fine_amount,
                    'status' => 'paid',
                    'metadata' => json_encode([
                        'description' => 'Payment for overdue book: ' . $borrowing->book->title,
                        'book_title' => $borrowing->book->title,
                        'paid_at' => $borrowing->fine_paid_at
                    ]),
                ]);
            }
        }
    }
}