import DonationsForm from "@/components/DonationsForm";

export default function Donations() {

    return (
        <div className="max-w-md mx-auto mt-24 p-5 border border-gray-300 rounded shadow mb-24">
            <h2 className="text-2xl font-arialroundedmtbold text-center mb-4 text-sivoy-blue">Hacer una Donación</h2>
            <DonationsForm />
        </div>
    );
}
