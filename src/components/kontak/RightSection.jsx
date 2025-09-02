import Image from "next/image";
import { Mail, Phone } from "lucide-react";

export const RightSection = () => {
  return (
    <div className="w-full md:w-1/2 flex flex-col justify-between items-center h-full">
      {/* Background Pattern */}
      <div className="relative w-full h-[380px] rounded-2xl overflow-hidden bg-mainColorDark/50 flex justify-center pt-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent_70%)]"></div>
        <Image
          src="/assets/contact-image.png"
          alt="contact illustration"
          width={400}
          height={400}
          className="relative z-10 object-cover"
        />
      </div>

      <div className="mt-6 w-full space-y-4">
        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
          <Mail className="text-mainColorLight w-6 h-6" />
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-gray-600">info@ganeshaconsulting.id</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
          <Phone className="text-mainColorLight w-6 h-6" />
          <div>
            <p className="text-sm font-medium">Phone</p>
            <p className="text-gray-600">+62 889‑9945‑1996</p>
          </div>
        </div>
      </div>
    </div>
  );
};
