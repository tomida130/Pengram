<?php

namespace Database\Factories;

use App\Models\Favorite;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Favorite>
 */
class FavoriteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Favorite::class;

    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'partner_id' => \App\Models\Images::factory(),
            'created_at' => now(),
        ];
    }
}
