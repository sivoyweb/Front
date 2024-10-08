import ContactForm from "@/components/ContactForm";

const ContactUs = () => {
    return (
        <section className="min-h-screen ">
            <div className="w-full max-w-md flex items-center justify-center bg-white mt-16 p-8 border border-gray-300 rounded-lg shadow-lg mx-auto">
                <ContactForm />
            </div>
        </section>
    );
};

export default ContactUs;
