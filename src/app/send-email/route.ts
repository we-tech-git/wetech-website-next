import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nome, sobrenome, email, telefone, assunto, mensagem } = body;

    // Validação básica
    if (!nome || !sobrenome || !email || !assunto || !mensagem) {
      return NextResponse.json(
        { error: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 }
      );
    }

    // Configuração do transporter do Nodemailer
    // Você pode usar Gmail, Outlook, ou qualquer outro serviço SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true para 465, false para outras portas
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Template do email
    const mailOptions = {
      from: `"Formulário We Tech" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO || 'contact@wetechhub.com.br',
      cc: process.env.SMTP_USER, // Cópia para noreplywetech@gmail.com
      replyTo: email,
      subject: `[We Tech] Novo contato - ${assunto.charAt(0).toUpperCase() + assunto.slice(1)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #1E7BFF; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Nova Mensagem de Contato</h1>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none;">
            <h2 style="color: #333; border-bottom: 2px solid #1E7BFF; padding-bottom: 10px;">Informações do Contato</h2>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Nome:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${nome} ${sobrenome}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Telefone:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${telefone || 'Não informado'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Assunto:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${assunto.charAt(0).toUpperCase() + assunto.slice(1)}</td>
              </tr>
            </table>

            <h2 style="color: #333; border-bottom: 2px solid #1E7BFF; padding-bottom: 10px; margin-top: 20px;">Mensagem</h2>
            <div style="background-color: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
              <p style="margin: 0; white-space: pre-wrap;">${mensagem}</p>
            </div>
          </div>

          <div style="background-color: #1E7BFF; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="margin: 0; font-size: 12px;">Este email foi enviado através do formulário de contato do site We Tech.</p>
          </div>
        </div>
      `,
      text: `
        Nova Mensagem de Contato - We Tech

        Nome: ${nome} ${sobrenome}
        Email: ${email}
        Telefone: ${telefone || 'Não informado'}
        Assunto: ${assunto}

        Mensagem:
        ${mensagem}
      `,
    };

    // Envia o email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email enviado com sucesso!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar email. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
