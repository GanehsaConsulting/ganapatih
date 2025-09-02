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
        Have questions or feedback? We're here to help. Send us a message, and
        we'll respond within 24 hours
      </p>

      <form className="mt-6 space-y-4 flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First name"
            className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Last name"
            className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-orange-500"
        />
        <textarea
          placeholder="Leave us message"
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
          Send Message
        </Button>
      </form>
    </div>
  )
}

