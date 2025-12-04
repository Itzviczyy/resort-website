'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';

interface RoomFilterProps {
  onFilterChange: (filters: {
    minPrice: number;
    maxPrice: number;
    capacity: number;
  }) => void;
}

export function RoomFilter({ onFilterChange }: RoomFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [capacity, setCapacity] = useState('');

  const handleApply = () => {
    onFilterChange({
      minPrice: minPrice ? Number(minPrice) : 0,
      maxPrice: maxPrice ? Number(maxPrice) : Infinity,
      capacity: capacity ? Number(capacity) : 0,
    });
  };

  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    setCapacity('');
    onFilterChange({
      minPrice: 0,
      maxPrice: Infinity,
      capacity: 0,
    });
  };

  return (
    <div className="mb-6">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-auto"
      >
        <Filter className="mr-2 h-4 w-4" />
        Filters
      </Button>

      {isOpen && (
        <Card className="mt-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Filter Rooms</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Min Price (₹)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Max Price (₹)</Label>
                <Input
                  type="number"
                  placeholder="10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Capacity</Label>
                <Select
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4+ Guests</option>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleApply}>Apply Filters</Button>
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}



