"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuickBookingWidget } from "@/components/forms/QuickBookingWidget";
import { RoomCard } from "@/components/rooms/RoomCard";

import {
  Wifi,
  Flame,
  Mountain,
  Coffee,
  Car,
  Headphones,
  ArrowRight,
  Star,
} from "lucide-react";

export default function HomePageClient({ featuredRooms }) {
  const galleryImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
  ];

  const thingsToDo = [
    {
      title: "Paragliding",
      image: "https://images.unsplash.com/photo-1551524164-6cf77f5e7f8e?w=600",
      href: "/things-to-do#paragliding",
    },
    {
      title: "Vagamon Meadows",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
      href: "/things-to-do#meadows",
    },
    {
      title: "Pine Forest",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
      href: "/things-to-do#pine-forest",
    },
  ];

  const amenities = [
    { icon: Wifi, label: "Free Wi-Fi" },
    { icon: Flame, label: "Campfire" },
    { icon: Mountain, label: "Mountain View" },
    { icon: Coffee, label: "Complimentary Breakfast" },
    { icon: Car, label: "Parking" },
    { icon: Headphones, label: "24x7 Support" },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Bangalore",
      rating: 5,
      text: "Amazing experience! The view from our room was breathtaking. Highly recommended!",
    },
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "Perfect getaway destination. Staff was very helpful, rooms were excellent!",
    },
    {
      name: "Amit Patel",
      location: "Delhi",
      rating: 5,
      text: "Best resort in Vagamon! Peaceful atmosphere and beautiful views.",
    },
  ];

  return (
    <div className="flex flex-col">

      {/** ---------------------------------------------------
       * HERO SECTION
       ---------------------------------------------------- */}
      <section className="relative h-screen w-full">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920"
            alt="Vagamon Hills"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="container px-4 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mb-4 text-5xl font-bold md:text-7xl">
                Vagamon Misty Heights Resort
              </h1>
              <p className="mb-8 text-xl md:text-2xl">
                Experience Serenity in the Heart of Kerala&apos;s Hills
              </p>
              <Button size="lg" asChild className="text-lg">
                <Link href="/booking">Book Your Stay</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 -mb-8 px-4">
          <QuickBookingWidget />
        </div>
      </section>


      {/** ---------------------------------------------------
       * ABOUT SECTION
       ---------------------------------------------------- */}
      <section className="container py-16 mt-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-4 text-4xl font-bold">About Our Resort in Vagamon</h2>
          <p className="mb-6 text-lg text-muted-foreground">
            Nestled in the scenic Vagamon hills, our resort blends nature with comfort.
          </p>
          <p className="text-lg text-muted-foreground">
            Whether you're seeking adventure, peace, or romance, we offer everything you need.
          </p>
        </motion.div>
      </section>


      {/** ---------------------------------------------------
       * FEATURED ROOMS
       ---------------------------------------------------- */}
      {featuredRooms.length > 0 && (
        <section className="bg-slate-50 py-16">
          <div className="container">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-8 text-center"
            >
              <h2 className="mb-4 text-4xl font-bold">Featured Rooms</h2>
              <p className="text-lg text-muted-foreground">
                Explore our best rooms specially curated for you
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredRooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <RoomCard
                    id={room.id}
                    name={room.name}
                    image={
                      room.images?.[0] ||
                      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
                    }
                    pricePerNight={room.pricePerNight}
                    capacity={room.capacity}
                    amenities={room.amenities}
                    description={room.description}
                  />
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/rooms">
                  View All Rooms
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}


      {/** ---------------------------------------------------
       * GALLERY SECTION
       ---------------------------------------------------- */}
      <section className="container py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold">Photo Gallery</h2>
          <p className="text-lg text-muted-foreground">
            Explore the beauty of our resort and Vagamon surroundings
          </p>
        </motion.div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative h-64 min-w-[300px] rounded-lg overflow-hidden"
            >
              <Image src={image} alt="" fill className="object-cover" />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/gallery">
              View Full Gallery
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>


      {/** ---------------------------------------------------
       * THINGS TO DO
       ---------------------------------------------------- */}
      <section className="bg-slate-50 py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-8 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold">Things to Do in Vagamon</h2>
            <p className="text-lg text-muted-foreground">
              Enjoy adventure, nature, and local experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {thingsToDo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group">
                  <div className="relative h-48 w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <Button variant="link" asChild className="mt-4 p-0">
                      <Link href={item.href}>
                        Know More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/** ---------------------------------------------------
       * AMENITIES
       ---------------------------------------------------- */}
      <section className="container py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-8 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Amenities</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need for a comfortable stay
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {amenities.map((a, index) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="text-center"
            >
              <Card className="p-6">
                <a.icon className="mx-auto mb-4 h-12 w-12 text-primary" />
                <p className="font-medium">{a.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>


      {/** ---------------------------------------------------
       * TESTIMONIALS
       ---------------------------------------------------- */}
      <section className="bg-slate-50 py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-8 text-center"
          >
            <h2 className="text-4xl font-bold mb-4">What Our Guests Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="mb-4 flex">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="mb-4 text-muted-foreground">&quot;{t.text}&quot;</p>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.location}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/** ---------------------------------------------------
       * CONTACT SECTION
       ---------------------------------------------------- */}
      <section className="container py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-8 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg text-muted-foreground">
            Reach out anytime for bookings and inquiries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Location</h3>
            <p className="text-muted-foreground mb-4">
              Vagamon, Kerala, India
            </p>
            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15715.123456789!2d76.9!3d9.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNDInMDAuMCJOIDc2wrA1NCcwMC4wIkU!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
            <p className="text-muted-foreground mb-4">Phone: +91 98765 43210</p>
            <p className="text-muted-foreground mb-4">Email: info@vagamonresort.com</p>
            <Button size="lg" asChild>
              <Link href="/booking">Book Your Stay Now</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
