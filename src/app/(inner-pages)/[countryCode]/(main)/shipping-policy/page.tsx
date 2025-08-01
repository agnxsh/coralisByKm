export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-light text-black mb-8">Shipping Policy</h1>
        
        <div className="space-y-8 text-base leading-relaxed text-gray-700">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p>
              <strong>Thank you for shopping with us!</strong> We're committed to delivering your order accurately, in good condition, and on time.
            </p>
          </div>

          <p>
            All orders are processed within <strong>[7-9 business days]</strong> (excluding weekends and holidays) after receiving your order confirmation email. 
            You will receive another notification when your order has shipped.
          </p>

          <p>
            Once your order has shipped, you'll receive a shipping confirmation email with a tracking number. 
            <strong>You can track your package at any time using the link provided.</strong>
          </p>

          <div>
            <h2 className="text-2xl font-medium text-black mb-4">Shipping Coverage</h2>
            <p><strong>We ship worldwide.</strong></p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-black mb-4">Delivery Information</h2>
            <p>
              While we strive to meet delivery estimates, delays may occur due to weather, holidays, courier issues, or high order volumes. 
              If your order hasn't arrived within 2 days of your expected delivery date, please contact us at 
              <strong> coralisbykm@gmail.com</strong> with your order number.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-medium text-black mb-4">Contact Information</h2>
            <p>Questions about shipping should be sent to us at:</p>
            <div className="mt-2">
              <p><strong>Email:</strong> <a href="mailto:coralisbykm@gmail.com" className="text-blue-600 hover:underline">coralisbykm@gmail.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}