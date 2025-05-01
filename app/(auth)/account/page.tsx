"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getCustomerDetails } from "../_actions/auth";
import { CustomerData, OrderNode } from "./types";

export default function AccountPage() {
  const router = useRouter();
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCustomerData() {
      // Check if token exists
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await getCustomerDetails(token);
        if (response.success && response.customer) {
          setCustomerData(response.customer);
        } else {
          setError(response.message || "Could not load customer data");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("expiresAt");
          setTimeout(() => router.push("/login"), 2000);
        }
      } catch (err) {
        setError("An error occurred while loading your account");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomerData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresAt");
    router.push("/login");
  };

  if (loading) {
    return <AccountSkeleton />;
  }

  if (error) {
    return (
      <div className="container py-12">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/login")}>Return to Login</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-medium">My Account</h1>
          <Button variant="outline" onClick={handleLogout}>Log out</Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {customerData && (
            <>
              <TabsContent value="profile">
                <ProfileSection customer={customerData} />
              </TabsContent>

              <TabsContent value="address">
                <AddressSection customer={customerData} />
              </TabsContent>

              <TabsContent value="orders">
                <OrdersSection orders={customerData.orders.nodes} />
              </TabsContent>
            </>
          )}
        </Tabs>
      </motion.div>
    </div>
  );
}

function ProfileSection({ customer }: { customer: CustomerData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Your personal details</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
            <p>{customer.firstName} {customer.lastName}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
            <p>{customer.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
            <p>{customer.phone || "Not provided"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Account Created</h3>
            <p>{format(new Date(customer.createdAt), "MMMM d, yyyy")}</p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Marketing Preferences</h3>
          <p>{customer.acceptsMarketing ? "Subscribed to marketing emails" : "Not subscribed to marketing emails"}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Edit Profile</Button>
      </CardFooter>
    </Card>
  );
}

function AddressSection({ customer }: { customer: CustomerData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Default Address</CardTitle>
        <CardDescription>Your shipping address</CardDescription>
      </CardHeader>
      <CardContent>
        {customer.defaultAddress ? (
          <div className="space-y-1">
            <p className="font-medium">{customer.firstName} {customer.lastName}</p>
            <p>{customer.defaultAddress.address1}</p>
            {customer.defaultAddress.address2 && <p>{customer.defaultAddress.address2}</p>}
            <p>
              {customer.defaultAddress.city}, {customer.defaultAddress.province} {customer.defaultAddress.zip}
            </p>
            <p>{customer.defaultAddress.country}</p>
          </div>
        ) : (
          <p className="text-muted-foreground">No address on file</p>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          {customer.defaultAddress ? "Edit Address" : "Add Address"}
        </Button>
      </CardFooter>
    </Card>
  );
}

function OrdersSection({ orders }: { orders: OrderNode[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>Your recent orders</CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{order.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(order.processedAt), "MMMM d, yyyy")}
                    </p>
                  </div>
                  <p className="font-medium">
                    {parseFloat(order.totalPrice.amount).toLocaleString("en-US", {
                      style: "currency",
                      currency: order.totalPrice.currencyCode,
                    })}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="mt-2">View Order Details</Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No orders yet</p>
        )}
      </CardContent>
    </Card>
  );
}

function AccountSkeleton() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-24" />
        </div>
        
        <div className="mb-6">
          <Skeleton className="h-10 w-80 mb-6" />
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-40 mb-2" />
              <Skeleton className="h-4 w-60" />
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-40" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
