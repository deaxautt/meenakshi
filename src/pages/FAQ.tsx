import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "How do I know if a gemstone is authentic?",
      answer: "All our gemstones come with certification from internationally recognized laboratories like GIA, IGI, etc. Each stone undergoes rigorous testing and authentication processes before being offered for sale."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 7-day return policy for all our products. The item must be unused and in its original packaging. For gemstones, the certification seal must be intact."
    },
    {
      question: "How do I care for my Rudraksha?",
      answer: "Keep your Rudraksha away from perfumes and chemicals. Clean it regularly with a soft cloth. You can use mild soap and water occasionally. Store it in a cotton pouch when not wearing."
    },
    {
      question: "Do you provide astrological consultation?",
      answer: "Yes, we provide expert astrological consultation services. Our experienced astrologers can help you choose the right gemstone based on your birth chart."
    },
    {
      question: "How do I know my ring size?",
      answer: "You can use our ring size guide available on the website. For more accurate measurements, we recommend visiting a local jeweler or ordering our ring sizer kit."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and popular digital wallets. All payments are processed through secure payment gateways."
    },
    {
      question: "How long does shipping take?",
      answer: "Domestic shipping typically takes 3-5 business days. International shipping can take 7-14 business days depending on the destination country."
    },
    {
      question: "Are the sarees handwoven?",
      answer: "Yes, our traditional sarees are handwoven by skilled artisans. Each piece is crafted with attention to detail and follows traditional weaving techniques."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {faqs.map((faq, index) => (
              <div key={index}>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium pr-8">{faq.question}</span>
                  {openIndex === index ? (
                    <Minus size={20} className="text-primary flex-shrink-0" />
                  ) : (
                    <Plus size={20} className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-600 bg-gray-50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {index !== faqs.length - 1 && <div className="border-b" />}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Still have questions?{' '}
              <a href="/contact" className="text-primary hover:text-primary-dark">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;