import "dotenv/config"
import { initMercadoPago } from '@mercadopago/sdk-react'

initMercadoPago("process.env.YOUR_PUBLIC_KEY");

export default function PaymentBrick () {
    return (
        <div></div>
    )
}