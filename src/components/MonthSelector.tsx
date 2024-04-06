import { useState } from 'react';

const MonthSelector = ({ setFormData,formData }: any) => {

    

    return (
        <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="">Billing Month</label>
            <select className='' id="monthSelect" value={formData.month} onChange={(e) =>
                setFormData((prev: any) => ({
                    ...prev,
                    month: e.target.value,
                }))}>
                <option value="">-- Select Month --</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="October">October</option>
                <option value="December">December</option>
            </select>
        </div>
    );
};

export default MonthSelector;
