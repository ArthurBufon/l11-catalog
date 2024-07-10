<?php

namespace App\Services\Product;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;

class QueryService
{
    public function getAll(): Collection
    {
        return Product::all();
    }

    public function create(array $data): void
    {
        Product::create($data);
    }

    public function update(Product $product, array $data): void
    {
        $product->update($data);
    }

    public function destroy(Product $product): void
    {
        $product->delete();
    }
}
