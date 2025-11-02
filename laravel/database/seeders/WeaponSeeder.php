<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WeaponSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('weapons')->insert([
            [
                'weapon_name' => '銀の剣', 
                'price' => 9800, 
                'weight' => 9.8, 
                'description' => '光を反射する純銀の剣',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'weapon_name' => '魔炎の杖', 
                'price' => 12800, 
                'weight' => 8.0, 
                'description' => '火の魔力を宿した古代の杖',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'weapon_name' => '勇者の弓', 
                'price' => 8800, 
                'weight' => 7.5, 
                'description' => '俊敏さを象徴する伝説の弓',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
