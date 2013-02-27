<a href="http://www.pesima.my">
  <img src="www.gravatar.com/avatar/a9c2466bb077238685e4c581c34c3fa8?s=100" width="100px">
</a>

# [Statik v0.1.0](http://www.pesima.my)

Statik merupakan projek yang dibangunkan oleh ahli PESIMA bagi memudahkan pengurusan fail statik HTML/CSS/JS/LESS secara lebih efisien, produktif dan mengurangkan tugas manual. 

## Objektif

Dibangunkan bertujuan:

* Meningkatkan kecekapan dan prestasi front-end laman web/portal selaras dengan rancangan/dasar Kerajaan berkenaan Sumber Terbuka;
* Memberi pendedahan tentang pembangunan sistem menggunakan Node JS;
* Sebagai salah satu medium di antara PPTM dalam memberi sumbangan kepada sesuatu projek;
* Memberi pendedahan kepada ahli PESIMA memperlajari medium pembangunan projek dalam ICT seperti Git, Nodejs, dan Github.

## Fungsi

Antara kebolehan projek Statik adalah menjalankan tugas secara automatik yang sebelum ini dilakukan secara manual seperti:

* Menguruskan aset statik (HTML/JS/CSS/LESS)
* Memproses fail LESS kepada CSS
* Memastikan kod JS (Javascript) tidak mengandungi ralat
* Menggabung, memproses dan memperkecilkan aset statik bagi mengurangkan jumlah panggilan aset daripada pelayan.
* Menyediakan versi kepada fail CSS dan JS.
* Mengasingkan persekitaran pembangunan dan juga produksi
* AKAN DATANG - Kebolehan memuat turun data melalui RSS dan memproses ke dalam bentuk HTML - TODO

## Pra-Pemasangan

Ringkasan mengenai Statik. Buat amsa ini, Statik tidak dimasukkan dalam NPM. 

* Projek dibangun menggunakan [Node.js](http://nodejs.org/).
* Sumber aset diletak dalam direktori `src`.
* Tugasan Statik bergantung penuh kepada `grunt` - salah satu rangka kerja penting dalam Node.js.
* Statik mengguna beberapa komponen `grunt`: 
  - `grunt-contrib-clean` - Membersihkan fail dan folder.
  - `grunt-contrib-concat` - Menggabungkan fail yang berasingan.
  - `grunt-contrib-jshint` - Melakukan siri pemeriksaan kod JS.
  - `grunt-contrib-uglify` - Memproses dan memperkecilkan saiz CSS
  - `grunt-contrib-watch` - Membolehkan tugasan dijalankan sekiranya berlaku perubahan pada fail.
  - `grunt-recess` - Memproses fail LESS dan menukarkan kepada format CSS yang lebih kemas dan mudah diurus.
* Konfigurasi utama Statik terletak pada fail `Gruntfile.js` dan tugasan individu boleh ditemui dalam direktori `tasks`
* Mesin (Windows/Linux) memerlukan beberapa perisian seperti Git, Nodejs

## TODO: Pemasangan

Panduan berikut adalah untuk pengguna Windows 7 64bit, bagi pengguna Linux mereka sudah pakar ;p

0. Muat turun dan buat pemasangan [Git for Windows](http://code.google.com/p/msysgit/downloads/list?q=full+installer+official+git)
1. Muat turun dan pemasangan [Node.js](http://nodejs.org/) dan npm. Buka tingkap arahan (Window Key + R) dan taipkan `cmd`. Semak versi Node dan npm bagi memastikan kedua-duanya telah dipasang: 
    ```
    C:\Users\adi>node -v && npm -v
    ```
2. Buka satu tingkap arahan Git Bash dan klon repo ini. Sekiranya protokol git tidak dibenarkan oleh firewall agensi, tukar format kepada https - atau [muat turun Statik](https://github.com/pesima/statik/zipball/master)
    ```
    $ git clone git://github.com/pesima/statik.git
    ```
3. Kemudian taip `npm install` - npm akan memuat turun komponen yang diperlukan oleh Statik

## TODO: Dokumentasi

## Sumbangan & Perkongsian

Tidak kira ahli PESIMA atau tidak, anda semua dialu-alukan menyumbang kepada projek ini.

* Melaporkan isu (sila rujuk [panduan membuat isu](https://github.com/necolas/issue-guidelines))
* Idea sama ada melibatkan projek ini atau projek baru.
* Menulis dan membuat penambahbaikan kepada dokumentasi
* Menulis atau membuat penstrukturan semula kod projek
* Melakukan penambahbaikan kepada [isu](https://github.com/pesima/statik/issues) yang dilapporkan