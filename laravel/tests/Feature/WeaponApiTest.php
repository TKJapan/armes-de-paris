<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Weapon;

class WeaponApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_weapon_index_returns_json_list()
    {
        Weapon::factory()->create([
            'weapon_name' => '銀の剣',
            'price' => 9800,
            'weight' => 9.8,
            'description' => '光を反射する純銀の剣',
        ]);

        $response = $this->getJson('/api/weapons');

        $response->assertStatus(200)
                 ->assertJsonFragment([
                     'weapon_name' => '銀の剣',
                     'price' => 9800,
                 ]);
    }
}
