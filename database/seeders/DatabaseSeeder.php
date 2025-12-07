<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // First run the basic seeders
        $this->call([
            SettingSeeder::class,
            CategorySeeder::class,
            AdminUserSeeder::class,
        ]);

        // Then run the comprehensive seeder with more detailed data
        $this->call(ComprehensiveSeeder::class);
    }
}
