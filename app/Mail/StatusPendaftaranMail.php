<?php

namespace App\Mail;

use App\Models\CalonSiswa;
use App\Models\Pendaftaran;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class StatusPendaftaranMail extends Mailable
{
    use Queueable, SerializesModels;

    public $calonSiswa;
    public $pendaftaran;

    /**
     * Create a new message instance.
     */
    public function __construct(CalonSiswa $calonSiswa, Pendaftaran $pendaftaran)
    {
        $this->calonSiswa = $calonSiswa;
        $this->pendaftaran = $pendaftaran;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        $statusLabel = $this->pendaftaran->status_akhir === 'Diterima' ? 'Diterima (Lolos Seleksi)' : 'Belum Diterima (Cadangan/Ditolak)';
        $subject = 'Pengumuman Hasil Seleksi Pendaftaran SMK - ' . $statusLabel;

        return $this->subject($subject)
                    ->markdown('emails.status-pendaftaran');
    }
}
