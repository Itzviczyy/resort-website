import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const activities = [
  {
    id: 'paragliding',
    title: 'Paragliding in Vagamon',
    image: 'https://images.unsplash.com/photo-1551524164-6cf77f5e7f8e?w=1200',
    description:
      'Experience the thrill of flying over the beautiful hills and meadows of Vagamon. Paragliding in Vagamon offers breathtaking aerial views of the landscape, making it one of the most popular adventure activities in the region. Certified instructors ensure a safe and memorable experience for both beginners and experienced flyers.',
    highlights: [
      'Certified instructors',
      'Safety equipment provided',
      'Aerial views of hills and meadows',
      'Suitable for beginners',
    ],
  },
  {
    id: 'meadows',
    title: 'Vagamon Meadows',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    description:
      'The rolling meadows of Vagamon are a sight to behold. These vast green expanses offer perfect spots for picnics, nature walks, and photography. The meadows are especially beautiful during the monsoon season when they turn into a lush green carpet. Visitors can enjoy peaceful walks, bird watching, or simply relax and soak in the natural beauty.',
    highlights: [
      'Perfect for picnics',
      'Nature walks and bird watching',
      'Photography opportunities',
      'Peaceful and serene atmosphere',
    ],
  },
  {
    id: 'pine-forest',
    title: 'Pine Forest',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200',
    description:
      'The Pine Forest in Vagamon is a unique attraction that offers a refreshing escape into nature. The tall pine trees create a cool, shaded environment perfect for leisurely walks. The forest is home to various bird species and provides excellent opportunities for nature photography. The peaceful ambiance makes it an ideal spot for meditation and relaxation.',
    highlights: [
      'Cool and shaded environment',
      'Bird watching opportunities',
      'Nature photography',
      'Peaceful walking trails',
    ],
  },
  {
    id: 'jeep-safari',
    title: 'Off-road Jeep Safari',
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1200',
    description:
      'Explore the rugged terrain of Vagamon with an exciting off-road jeep safari. This adventure activity takes you through scenic routes, tea plantations, and hidden viewpoints that are otherwise inaccessible. The jeep safari is perfect for adventure enthusiasts looking to explore the less-traveled paths of Vagamon.',
    highlights: [
      'Scenic off-road routes',
      'Visit hidden viewpoints',
      'Explore tea plantations',
      'Adventure-filled experience',
    ],
  },
  {
    id: 'tea-estates',
    title: 'Tea Estates and Plantations',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200',
    description:
      'Vagamon is surrounded by beautiful tea estates that offer a glimpse into the tea cultivation process. Visitors can take guided tours of the tea plantations, learn about tea processing, and enjoy fresh tea tasting sessions. The lush green tea gardens against the backdrop of hills create a picturesque setting.',
    highlights: [
      'Guided plantation tours',
      'Tea processing demonstrations',
      'Fresh tea tasting',
      'Picturesque landscapes',
    ],
  },
  {
    id: 'waterfalls',
    title: 'Waterfalls and Viewpoints',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200',
    description:
      'Vagamon is home to several beautiful waterfalls and scenic viewpoints that offer panoramic views of the surrounding hills and valleys. These natural attractions are perfect for nature lovers and photographers. The viewpoints are especially popular during sunrise and sunset when the landscape is bathed in golden light.',
    highlights: [
      'Panoramic hill views',
      'Beautiful waterfalls',
      'Sunrise and sunset views',
      'Photography opportunities',
    ],
  },
];

export default function ThingsToDoPage() {
  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Things to Do in Vagamon</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Discover exciting activities and attractions that make Vagamon a
          perfect destination for nature lovers and adventure enthusiasts
        </p>
      </div>

      <div className="space-y-12">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            id={activity.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="scroll-mt-20"
          >
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
                <div className="relative h-64 md:h-full">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <CardHeader>
                    <CardTitle className="text-2xl">{activity.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {activity.description}
                    </p>
                    <div>
                      <h4 className="mb-2 font-semibold">Highlights:</h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                        {activity.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href={`#${activity.id}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Card className="bg-primary/5">
          <CardContent className="p-8">
            <h2 className="mb-4 text-2xl font-bold">
              Ready to Experience Vagamon?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Book your stay with us and explore all these amazing activities
            </p>
            <Button size="lg" asChild>
              <Link href="/booking">
                Book Your Stay Now
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


