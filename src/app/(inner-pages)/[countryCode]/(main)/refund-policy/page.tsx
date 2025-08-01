export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-light text-black mb-8">Refund & Return Policy</h1>
        
        <div className="space-y-8 text-base leading-relaxed text-gray-700">
          <p className="text-lg text-gray-600">
            We're sure you won't want to return your Coralis piece, but in the rare event something isn't right, we're here to help.
          </p>

          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p><strong>Important:</strong> Our policy lasts <strong>10 days</strong>. If 10 days have gone by since your purchase, unfortunately we can't offer you a refund or exchange.</p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-black mb-4">We Accept Returns Only If:</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>A clear unboxing video is provided</strong>, taken while opening the package for the first time.</li>
              <li><strong>The product is damaged</strong>, and the issue is clearly visible in the video.</li>
              <li><strong>The return request is made within 10 DAYS</strong> of delivery.</li>
            </ul>
            <p className="mt-4">For size-related issues, we're happy to send the correct size once the original item is returned to us.</p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-black mb-4">Important Notes:</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>All returns must be arranged back by the customer <strong>at their own cost</strong>.</li>
              <li>Items must be <strong>unused and returned in their original packaging</strong>.</li>
              <li>We do <strong>not accept returns for change of mind</strong> or courier delays.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-black mb-4">Refunds</h2>
            <p>
              Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. 
              We will also notify you of the approval or rejection of your refund.
            </p>
            <p className="mt-4">
              If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-black mb-4">Late or Missing Refunds</h2>
            <p>If you haven't received a refund yet:</p>
            <ol className="list-decimal list-inside space-y-1 ml-4 mt-2">
              <li>First check your bank account again</li>
              <li>Contact your credit card company, it may take some time before your refund is officially posted</li>
              <li>Contact your bank. There is often some processing time before a refund is posted</li>
              <li>If you've done all of this and still haven't received your refund, contact us at <strong>coralisbykm@gmail.com</strong></li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-black mb-4">Sale Items</h2>
            <p><strong>Only regular priced items may be refunded</strong>, unfortunately sale items cannot be refunded.</p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-black mb-4">Exchanges</h2>
            <p>
              We only replace items if they are defective or damaged (once we are provided with a full opening video of the product) or for Size exchange. 
              If you need to exchange it for the same item, send us an email with the video attached at <strong>coralisbykm@gmail.com</strong>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-black mb-4">Shipping</h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p><strong>Return Address:</strong></p>
              <p className="mt-2">
                114 W/3 RAJA S.C MALLICK ROAD<br />
                GARIA, KOLKATA- 700047
              </p>
            </div>
            <p className="mt-4">
              You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. 
              If you receive a refund, the cost of return shipping will be deducted from your refund.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-medium text-black mb-4">Contact Us</h2>
            <p>For any questions about returns or exchanges:</p>
            <div className="mt-2">
              <p><strong>Email:</strong> <a href="mailto:coralisbykm@gmail.com" className="text-blue-600 hover:underline">coralisbykm@gmail.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}