<?php

namespace Tests\Feature;

use App\Models\Favorite;
use App\Models\Images;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;


class FavoriteControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    use RefreshDatabase;

    protected $user1;
    protected $user2;
    protected $image1;
    protected $image2;
    protected $image3;

    public function setUp(): void
    {
        parent::setUp();

        // 複数のテストユーザーを作成
        $this->user1 = User::factory()->create();
        $this->user2 = User::factory()->create();

        // テスト用のデータを作成
        $this->image1 = Images::factory()->create([
            'taitle' => 'Test Image 1',
            'image' => 'image1.jpg',
            'user_id' => $this->user1->id,
        ]);

        $this->image2 = Images::factory()->create([
            'taitle' => 'Test Image 2',
            'image' => 'image2.jpg',
            'user_id' => $this->user1->id,
        ]);

        // 新しい画像 (image3) の作成
        $this->image3 = Images::factory()->create([
            'taitle' => 'Test Image 3',
            'image' => 'image3.jpg',
            'user_id' => $this->user1->id,
        ]);

        // 1週間以内のFavoriteを作成 (image1, user1)
        Favorite::factory()->create([
            'user_id' => $this->user1->id,
            'partner_id' => $this->image1->id,
            'created_at' => Carbon::now()->subDays(3),
        ]);

        // 1週間以内のFavoriteを作成 (image1, user2)
        Favorite::factory()->create([
            'user_id' => $this->user2->id,
            'partner_id' => $this->image1->id,
            'created_at' => Carbon::now()->subDays(4),
        ]);

        // 1週間以上前のFavoriteを作成 (image2, user1)
        Favorite::factory()->create([
            'user_id' => $this->user1->id,
            'partner_id' => $this->image2->id,
            'created_at' => Carbon::now()->subDays(10),
        ]);

        // 1週間以内のFavoriteを作成 (image3, user3)
        Favorite::factory()->create([
            'user_id' => $this->user1->id,
            'partner_id' => $this->image3->id,
            'created_at' => Carbon::now()->subDays(2),
        ]);

        // 1週間後のFavoriteを作成 (image3, user1)
        Favorite::factory()->create([
            'user_id' => $this->user2->id,
            'partner_id' => $this->image3->id,
            'created_at' => Carbon::now()->addDays(7),
        ]);
    }

    public function it_returns_images_sorted_by_favorites_in_the_last_week()
    {
        // APIエンドポイントを呼び出し
        $response = $this->actingAs($this->user1)
                         ->getJson('/api/favorites/sort');

        // レスポンスの構造を確認
        $response->assertStatus(200)
                 ->assertJsonStructure([
                     '*' => ['id', 'taitle', 'image', 'user_id', 'favorite_count'],
                 ]);

        // データの内容を確認
        $images = $response->json();

        // 1週間以内のいいねの数が多い画像が最初に来ることを確認
        $this->assertEquals($this->image1->id, $images[0]['id']); // image1が最初に来る
        $this->assertEquals(2, $images[0]['favorite_count']);     // image1のいいね数が2

        $this->assertEquals($this->image3->id, $images[1]['id']); // image3が次に来る
        $this->assertEquals(1, $images[1]['favorite_count']);     // image3の1週間以内のいいね数が1
    }
}