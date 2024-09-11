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
    /**
     * @var User
     */
    protected $user;

    /**
     * @var Images
     */
    protected $image1;

    /**
     * @var Images
     */
    protected $image2;

    public function setUp(): void
    {
        parent::setUp();

        // テストユーザーの作成
        $this->user = User::factory()->create();

        // テスト用のデータを作成
        $this->image1 = Images::factory()->create([
            'taitle' => 'Test Image 1',
            'image' => 'image1.jpg',
            'user_id' => $this->user->id,
        ]);

        $this->image2 = Images::factory()->create([
            'taitle' => 'Test Image 2',
            'image' => 'image2.jpg',
            'user_id' => $this->user->id,
        ]);

        // 1週間以内のFavoriteを作成
        Favorite::factory()->create([
            'user_id' => $this->user->id,
            'partner_id' => $this->image1->id,
            'created_at' => Carbon::now()->subDays(3),
        ]);

        // 1週間以上前のFavoriteを作成
        Favorite::factory()->create([
            'user_id' => $this->user->id,
            'partner_id' => $this->image2->id,
            'created_at' => Carbon::now()->subDays(10),
        ]);
    }


    public function it_returns_images_sorted_by_favorites_in_the_last_week()
    {
        // APIエンドポイントを呼び出し
        $response = $this->actingAs($this->user)
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
        $this->assertEquals(1, $images[0]['favorite_count']);     // image1のいいね数が1
        $this->assertEquals(0, $images[1]['favorite_count']);     // image2のいいね数が0
    }

    

}
