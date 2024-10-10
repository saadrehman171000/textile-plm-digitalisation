import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
const prisma = new PrismaClient();

async function checkAuth() {
  const { userId } = auth();
  return userId;
}

export async function POST(req: NextRequest) {
  const userId = await checkAuth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { product, quantity, price, notes } = await req.json();
  console.log(product, quantity, price, notes);
  // add validation for the product, quantity, status, price
  if (!product || !quantity || !price || !notes) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const order = await prisma.order.create({
    data: {
      user_id: userId,
      product,
      quantity,
      status: "Pending",
      total: price * quantity,
      notes,
    },
  });

  return NextResponse.json(order, { status: 201 });
}

export async function GET(req: NextRequest) {
  const userId = await checkAuth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    // Return a single order
    const order = await prisma.order.findUnique({
      where: { id, user_id: userId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } else {
    // Return all orders for the user
    const orders = await prisma.order.findMany({
      where: { user_id: userId },
    });

    return NextResponse.json(orders);
  }
}

export async function PUT(req: NextRequest) {
  const userId = await checkAuth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "Order ID is required" },
      { status: 400 }
    );
  }
  const { product, quantity, status, total } = await req.json();

  const updatedOrder = await prisma.order.updateMany({
    where: { id: id, user_id: userId },
    data: { product, quantity, status, total },
  });

  if (updatedOrder.count === 0) {
    return NextResponse.json(
      { error: "Order not found or unauthorized" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Order updated successfully" });
}

export async function DELETE(req: NextRequest) {
  const userId = await checkAuth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "Order ID is required" },
      { status: 400 }
    );
  }

  const deletedOrder = await prisma.order.deleteMany({
    where: { id: id, user_id: userId },
  });

  if (deletedOrder.count === 0) {
    return NextResponse.json(
      { error: "Order not found or unauthorized" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Order deleted successfully" });
}
