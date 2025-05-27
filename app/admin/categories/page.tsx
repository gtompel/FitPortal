'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Ошибка загрузки категорий');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast.error('Ошибка загрузки категорий');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту категорию?')) return;

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Ошибка при удалении категории');

      toast.success('Категория удалена');
      fetchCategories();
    } catch (error) {
      toast.error('Ошибка при удалении категории');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Категории</h1>
        <Button onClick={() => router.push('/admin/categories/new')}>
          Добавить категорию
        </Button>
      </div>

      <div className="grid gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-4 border rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.slug}</p>
              <p className="text-sm mt-1">{category.description}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => router.push(`/admin/categories/${category.id}/edit`)}
              >
                Редактировать
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(category.id)}
              >
                Удалить
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 