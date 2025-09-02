import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export const KontakForm = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm w-full md:w-1/2 h-full flex flex-col">
      <Badge
        variant="outline"
        className="border border-mainColorLight text-mainColorLight bg-mainColorLight/10 rounded-full px-3 sm:px-4 py-1"
      >
        Get in Touch
      </Badge>
      <h2 className="text-3xl font-bold mt-2 text-mainColorLight">
        Let's Chat, Reach Out to Us
      </h2>
      <p className="text-gray-600 mt-2">
        Punya pertanyaan atau masukan? Kami siap membantu Anda. Kirimkan pesan,
        dan tim kami akan merespons dalam waktu 24 jam.
      </p>

      <form className="mt-6 space-y-4 flex-1 flex flex-col">
        
        <input
          type="text"
          placeholder="Fullname"
          className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="email"
          placeholder="Email address"
          className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-orange-500"
        />
        <textarea
          placeholder="Tulis pesan Anda di sini"
          className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-orange-500"
          rows={5}
        ></textarea>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="privacy" className="h-4 w-4" />
          <label htmlFor="privacy" className="text-sm text-gray-600">
            I agree to our friendly privacy policy
          </label>
        </div>
        <Button className="block w-full bg-mainColorLight text-white mt-auto">
          Kirim Pesan
        </Button>
      </form>
    </div>
  )
}

