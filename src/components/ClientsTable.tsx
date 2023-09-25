"use client"

import * as React from "react"
import { BiTrash } from "react-icons/bi";
import { useRouter } from 'next/navigation';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { appwriteService } from "@/appwrite/config";
import { FaCopy, FaRegBell, FaUserEdit } from "react-icons/fa";


export function ClientsTable({ data,alertCustomer }: any) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const router = useRouter()
    const columns: ColumnDef<any>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "phone",
            header: ({ column }) => {
                return (
                    <p
                        className="flex"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Phone Number
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </p>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
        },
        {
            accessorKey: "meter",
            header: ({ column }) => {
                return (
                    <p
                        className=" flex"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Meter
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </p>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("meter")}</div>,
        },
        {
            accessorKey: "initialReading",
            header: ({ column }) => {
                return (
                    <p
                        className="flex"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Initial Reading
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </p>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("initialReading")}</div>,
        },
        {
            accessorKey: "finalReading",
            header: ({ column }) => {
                return (
                    <p
                        className="flex"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Final Reading
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </p>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("finalReading")}</div>,
        },

        {
            accessorKey: "totalBill",
            header: () => <div className="text-right">Total Bill</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("totalBill"))

                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "ksh",
                }).format(amount)

                return <div className="text-right font-medium">{formatted}</div>
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const client = row.original

                return (
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" >
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                                <p onClick={()=> alertCustomer(client.$id)} className="flex items-center gap-2 text-base cursor-pointer">
                                    <FaRegBell />
                                    Alert Customer
                                </p>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(client.phone)}
                            >
                                <p className="flex items-center gap-2 text-base cursor-pointer" >
                                    <FaCopy />
                                    Copy Phone
                                </p>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <p onClick={() => { router.push(`/console/records/update/${client.$id}`) }} className="text-green-900 flex items-center gap-2  text-base cursor-pointer">
                                    <FaUserEdit />
                                    Update Customer</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <p className="flex items-center gap-2 text-red-900 text-base cursor-pointer" onClick={() => { appwriteService.deleteClient(client.$id) }}>
                                    <BiTrash />
                                    Delete Customer
                                </p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter phone numbers..."
                    value={(table.getColumn("phone")?.getFilterValue() as string) ?? ""}
                    onChange={(event: any) =>
                        table.getColumn("phone")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm rounded-lg"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value: any) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No Clients Found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
