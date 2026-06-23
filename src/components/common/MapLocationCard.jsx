import { useState } from "react"
import { ExternalLink, LocateFixed, MapPin, Navigation, Route } from "lucide-react"

function formatEta(seconds) {
  const mins = Math.round(seconds / 60)
  if (mins < 60) return `${mins} min`
  const hours = Math.floor(mins / 60)
  const rem = mins % 60
  return `${hours}h ${rem}m`
}

export function MapLocationCard({ mapsEmbed, address, destination, coordinates }) {
  const [eta, setEta] = useState("")
  const [distance, setDistance] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const destinationLatLng = `${coordinates.lat},${coordinates.lng}`
  const mapsPlaceUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`

  function openDirectionsWithOrigin(lat, lng) {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${destinationLatLng}&travelmode=driving`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  async function getRouteEta(lat, lng) {
    const endpoint = `https://router.project-osrm.org/route/v1/driving/${lng},${lat};${coordinates.lng},${coordinates.lat}?overview=false`
    const response = await fetch(endpoint)
    if (!response.ok) throw new Error("Unable to fetch route.")
    const data = await response.json()
    if (!data?.routes?.length) throw new Error("No route data found.")

    const route = data.routes[0]
    setEta(formatEta(route.duration))
    setDistance(`${(route.distance / 1000).toFixed(1)} km`)
  }

  function handleGetEta() {
    setError("")
    if (!navigator.geolocation) {
      setError("Location is not supported on this device.")
      return
    }

    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          await getRouteEta(coords.latitude, coords.longitude)
        } catch {
          setError("Could not calculate ETA. Tap Directions to see live ETA in Maps.")
        } finally {
          setLoading(false)
        }
      },
      () => {
        setError("Location permission denied. Tap Directions to continue in Maps.")
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
    )
  }

  function handleDirections() {
    if (!navigator.geolocation) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${destinationLatLng}&travelmode=driving`,
        "_blank",
        "noopener,noreferrer",
      )
      return
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => openDirectionsWithOrigin(coords.latitude, coords.longitude),
      () =>
        window.open(
          `https://www.google.com/maps/dir/?api=1&destination=${destinationLatLng}&travelmode=driving`,
          "_blank",
          "noopener,noreferrer",
        ),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
      <iframe
        title="Sri D.K.K Hospital Location Map"
        src={mapsEmbed}
        loading="lazy"
        className="h-[380px] w-full rounded-2xl border border-slate-200"
      />
      <div className="mt-3 flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
        <MapPin className="mt-0.5 h-4 w-4 text-sky-700" />
        {address}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleDirections}
          className="inline-flex items-center rounded-xl bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
        >
          <Navigation className="mr-2 h-4 w-4" />
          Directions
        </button>
        <button
          type="button"
          onClick={handleGetEta}
          className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
          disabled={loading}
        >
          <LocateFixed className="mr-2 h-4 w-4" />
          {loading ? "Checking..." : "Show Travel Time"}
        </button>
        <a
          href={mapsPlaceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Open Map
        </a>
      </div>

      {eta ? (
        <p className="mt-3 inline-flex items-center rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
          <Route className="mr-2 h-4 w-4" />
          Estimated travel time: {eta} ({distance})
        </p>
      ) : null}
      {error ? <p className="mt-3 text-sm text-amber-700">{error}</p> : null}
    </div>
  )
}
