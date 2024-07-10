import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

const Transactions = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: new Date(), amount: 100, type: "Income", brand: "Nike" },
    { id: 2, date: new Date(), amount: 200, type: "Expense", brand: "Adidas" },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: transactions.length + 1 }]);
  };

  const handleEditTransaction = (updatedTransaction) => {
    setTransactions(transactions.map((transaction) => (transaction.id === updatedTransaction.id ? updatedTransaction : transaction)));
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Sneaker Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => setIsEditing(false)}>Add Transaction</Button>
              </DialogTrigger>
              <TransactionModal
                isEditing={isEditing}
                transaction={currentTransaction}
                onSave={(transaction) => {
                  isEditing ? handleEditTransaction(transaction) : handleAddTransaction(transaction);
                }}
              />
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{format(transaction.date, "yyyy-MM-dd")}</TableCell>
                  <TableCell>${transaction.amount}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.brand}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsEditing(true);
                        setCurrentTransaction(transaction);
                      }}
                    >
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteTransaction(transaction.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const TransactionModal = ({ isEditing, transaction, onSave }) => {
  const [date, setDate] = useState(transaction ? transaction.date : new Date());
  const [amount, setAmount] = useState(transaction ? transaction.amount : "");
  const [type, setType] = useState(transaction ? transaction.type : "Income");
  const [brand, setBrand] = useState(transaction ? transaction.brand : "Nike");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: transaction ? transaction.id : null, date, amount, type, brand });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{isEditing ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Date</label>
          <Input type="date" value={format(date, "yyyy-MM-dd")} onChange={(e) => setDate(new Date(e.target.value))} required />
        </div>
        <div>
          <label>Amount</label>
          <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div>
          <label>Type</label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Income">Income</SelectItem>
              <SelectItem value="Expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label>Brand</label>
          <Select value={brand} onValueChange={setBrand}>
            <SelectTrigger>
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nike">Nike</SelectItem>
              <SelectItem value="Adidas">Adidas</SelectItem>
              <SelectItem value="Puma">Puma</SelectItem>
              <SelectItem value="Reebok">Reebok</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default Transactions;