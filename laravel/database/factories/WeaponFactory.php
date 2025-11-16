<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class WeaponFactory extends Factory
{
    public function definition(): array
    {
        return [
            'weapon_name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->numberBetween(5000, 15000),
            'weight' => $this->faker->randomFloat(1, 3, 12),
        ];
    }
}
