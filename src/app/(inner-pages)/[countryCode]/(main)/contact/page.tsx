'use client'

import { Heading, Text } from "@medusajs/ui"
import { Mail } from "lucide-react"
import Link from "next/link"

const ContactPage = () => {
  return (
    <div className="py-6 md:py-12">
      <div className="content-container" data-testid="contact-container">
        <div className="py-12 md:py-48 px-2 flex flex-col justify-center items-center">
          <Heading
            level="h1"
            className="flex flex-row text-2xl md:text-3xl-regular gap-x-2 items-baseline text-center"
          >
            Contact Us
          </Heading>
          <Text className="text-base-regular mt-4 mb-8 max-w-[32rem] text-center">
            Get in touch with us. We&apos;d love to hear from you.
          </Text>
          
          <div className="w-full max-w-2xl space-y-4 md:space-y-6">
            {/* Email Contact Card */}
            <div className="bg-white flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <Heading level="h3" className="txt-large md:txt-xlarge">
                    Email Us
                  </Heading>
                  <Text className="txt-small md:txt-medium text-ui-fg-subtle mt-1 md:mt-2">
                    For general inquiries and support
                  </Text>
                </div>
              </div>
              <div className="ml-16 md:ml-0">
                <a 
                  href="mailto:coralisbykm@gmail.com"
                  className="txt-small md:txt-medium text-ui-fg-base hover:text-ui-fg-interactive transition-colors break-all"
                >
                  coralisbykm@gmail.com
                </a>
              </div>
            </div>

            {/* WhatsApp Contact Card */}
            <div className="bg-white flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                  <svg 
                    className="w-6 h-6 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
                <div>
                  <Heading level="h3" className="txt-large md:txt-xlarge">
                    WhatsApp
                  </Heading>
                  <Text className="txt-small md:txt-medium text-ui-fg-subtle mt-1 md:mt-2">
                    Quick support and instant messaging
                  </Text>
                </div>
              </div>
              <div className="ml-16 md:ml-0">

                <Link href="https://wa.link/bcj8b5" className="txt-small text-ui-fg-base hover:text-ui-fg-interactive transition-colors break-all">
                +91 96743 14995
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
