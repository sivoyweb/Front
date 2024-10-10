import ContactForm from "@/components/ContactForm";

const ContactUs = () => {
    return (
        <section className="min-h-screen px-8">
            <div className="max-w-lg justify-center bg-white mt-16 py-8 px-8 border border-gray-300 rounded-3xl shadow-lg mx-auto">
                <ContactForm />
            </div>
        </section>
    );
};

export default ContactUs;