import React from 'react';
import {Link} from 'react-router-dom';

function Record({ id, amount,type, dateTime}) {
    return (
            <Link to={`/transaction/${id}`} className="relative p-4 block hover:bg-slate-100">

                <h2 className={`${ type=="DEBIT" ? 'text-red-500': 'text-green-500'} text-xl font-semibold`}>
                {(amount<0) ? `-N${Math.abs(amount)}` : `+N${amount}`}
                </h2>
                <span className=" absolute bottom-0 right-4 text-neutral-500 text-xs font-medium">{dateTime}</span>
            </Link>               
    )
}

export default Record;
