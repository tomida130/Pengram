# Pengram

![pengramlog1](https://github.com/tomida130/Pengram/assets/114141852/9c4646d4-56ef-446e-922a-c6a40fae9842)

## 概要

就活用に作成したポートフォリオです<br>
絵を共有するSNSとなります<br>
主にNext.jsとLravelを用いて作成しました<br>

## 使用例

<img src="https://github.com/user-attachments/assets/13248ea3-fef8-41de-901f-c8965cee172f" width="600px"><br>

### 絵を作成<br><br>
<img src="https://github.com/user-attachments/assets/761f5a62-0ef5-4a7e-b775-1b646312ac56" width="600px"><br>
### 作成した絵をいいね機能、人気機能、お気に入り一覧、作成リスト<br><br>
<img src="https://github.com/user-attachments/assets/c1fa0e98-57c7-4073-ad95-f910311b3f82" width="600px"><br>
### 検索機能<br><br>
<img src="https://github.com/user-attachments/assets/e105d1be-4396-4f1a-8c59-5aed321b95e1" width="600px"><br>
### スマホに対応(絵を作成する機能は対応していません)<br><br>
<img src="https://github.com/user-attachments/assets/96723a60-c745-4f59-8865-f8682b808b15" width="600px"><br>


## なぜ作成したのか

ポートフォリオ制作の理由:
近年、AIによって生成された画像が溢れ、新人イラストレーターとして活動を始めるのは困難な状況だと感じました。そこで、この課題に対応するため、独自のお絵描きSNSを開発しました。<br>
このプラットフォームの特徴:<br>

1. サイト内描画機能: ユーザーはサイト上で直接絵を描いて投稿する必要があります。これにより、AIで生成された画像の投稿を防ぎ、手描きの作品のみが共有されることを保証します。<br>
2. 匿名投稿システム: 投稿者の名前を表示しないことで、作品の評価が純粋に絵の質に基づいて行われるようにしました。これにより、新人アーティストも既存の知名度に左右されることなく、公平に競争できる環境を提供します。<br>
3. 共有機能: ユーザーは気に入った作品を簡単に拡散することができます。これにより、優れた作品がより多くの人の目に触れる機会が増え、アーティストの露出度を高めることができます。<br><br>
   このプロジェクトを通じて、デジタル時代においても手描きアートの価値を再確認し、新しいアーティストの成長を支援する環境を作り出すことを目指しています。<br>

## 使用技術

### 言語系

<p style="display: inline">
<img src="https://img.shields.io/badge/-Javascript-blue.svg?logo=javascript&&style=flat">
<img src="https://img.shields.io/badge/-TypeScript-007ACC.svg?logo=typescript&style=flat&logoColor=white">
<img src="https://img.shields.io/badge/-Php-777BB4.svg?logo=php&style=flat&logoColor=white">
</p>
PHP 8.2.12<br>

### フレームワーク

<p style="display: inline">
<img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=flat">
<img src="https://img.shields.io/badge/-React-61DAFB.svg?logo=react&style=flat&logoColor=white">
<img src="https://img.shields.io/badge/-Laravel-E74430.svg?logo=laravel&style=flat&logoColor=white">

### ミドルウェア

<img src="https://img.shields.io/badge/-Mysql-4479A1.svg?logo=mysql&style=flat&logoColor=white">

### その他

<p style="display: inline">
<img src="https://img.shields.io/badge/-Docker-1488C6.svg?logo=docker&style=plastic">
<img src="https://img.shields.io/badge/-Visual%20Studio%20Code-007ACC.svg?logo=visual-studio-code&style=flat">
<img src="https://img.shields.io/badge/-Node.js-339933.svg?logo=node.js&style=flat&logoColor=white">
</p>

## ER図

![pengaram drawio (1)](https://github.com/tomida130/Pengram/assets/114141852/6ba2ddff-3ea4-4c73-9b0e-ee39390197db)

## インフラ構成図（予定）
![Pengram_AWS2 drawio](https://github.com/user-attachments/assets/8b8b0a5a-140e-47e3-aff9-8e5e394f451c)

## 機能

- ユーザーログイン、登録<br>
- ユーザーパスワードの再設定<br>
- 絵作成機能<br>
- ダウンロード機能<br>
- お気に入り登録機能<br>
- 作成物確認機能(5/22　追加)<br>
- 検索機能<br>
- 絵作成機能の拡充(消しゴム、線の大きさの調整)<br>
- 人気順（１種間以内にいいねが押された数順）<br>
- 共有機能<br>
## 工夫点

- 画像を上から新しい順に表示するため、バックエンドで配列を反転させた
- 人気順を、いいねの数で表示するのではなく。いいねが直近1週間で押された回数順に表示するようにした。
- Laravelを用いることで簡単にSQLインジェクションを対策

## 今後の予定

- AWSへのデプロイ
## 変更

5/20 アップロード<br>
5/21 エラーを修正<br>
5/22 作成物確認機能追加<br>
5/28 お気に入り機能の修正<br>
6/01 コードを変更<br>
6/04 XamppからDockerへ移行<br>
6/05 - いいね数表示 削除機能<br>
6/10 絵作成機能の拡充(消しゴム、線の大きさの調整)<br>
8/25 検索機能 絵作成機能の拡充（線の色変更）<br>
8/27 人気順<br>
8/31 共有機能<br>
