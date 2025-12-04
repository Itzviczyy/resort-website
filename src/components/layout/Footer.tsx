import Link from 'next/link';
import { Mountain, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-nature-green">
                Vagamon Misty Heights Resort
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Experience the serene beauty of Vagamon's hills, meadows, and tea
              estates in our luxurious resort.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms"
                  className="text-muted-foreground hover:text-primary"
                >
                  Rooms
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-muted-foreground hover:text-primary"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/things-to-do"
                  className="text-muted-foreground hover:text-primary"
                >
                  Things to Do
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="text-muted-foreground hover:text-primary"
                >
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  Vagamon, Idukki District, Kerala, India
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href="tel:+919876543210"
                  className="text-muted-foreground hover:text-primary"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:info@vagamonresort.com"
                  className="text-muted-foreground hover:text-primary"
                >
                  info@vagamonresort.com
                </a>
              </li>
            </ul>
          </div>

          {/* Admin */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Admin</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/admin/login"
                  className="text-muted-foreground hover:text-primary"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Vagamon Misty Heights Resort.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}



