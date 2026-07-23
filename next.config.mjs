/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // nodemailer нельзя бандлить: при сборке ломается его работа с сокетами
  // и отправка виснет без ошибки. Оставляем библиотеку внешней.
  serverExternalPackages: ['nodemailer'],
}

export default nextConfig
