import ContactForm from "@/components/ContactForm";

const ContactUs = () => {
    return (
        <section className="min-h-screen">
            <div className="max-w-lg justify-center bg-white mt-20 py-8 px-16 border border-gray-300 rounded-3xl shadow-lg mx-auto">
                <ContactForm />
            </div>
        </section>
    );
};

export default ContactUs;