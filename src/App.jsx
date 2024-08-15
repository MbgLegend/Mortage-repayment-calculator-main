import { useEffect, useState } from "react"

const App = () => {
    const [focusedInput, setFocusedInput] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [form, setForm] = useState({
        amount: null,
        term: null,
        rate: null,
        type: null
    })
    const [total, setTotal] = useState(null)

    const handleFocus = (inputID) => {
        setFocusedInput(inputID)
    }
    const handleBlur = () => {
        setFocusedInput(null)
    }
    const handleCalculation = () => {
        let newEmptyFields = []
    
        // Validate each field
        Object.entries(form).forEach(([key, value]) => {
            if ((key === 'amount' || key === 'term' || key === 'rate') && (isNaN(value) || value <= 0)) {
                newEmptyFields.push(key)
            }

            if (key === 'type' && (value !== 'repayment' && value !== 'intereset_only')) {
                newEmptyFields.push(key)
            }
        })

        setEmptyFields(newEmptyFields)

        if (newEmptyFields.length === 0) {
            const principal = parseFloat(form.amount)
            const annualInterestRate = parseFloat(form.rate) / 100
            const numberOfYears = parseFloat(form.term)

            if (form.type === 'repayment') {
                // Calculate monthly repayment (example formula for fixed-rate mortgage)
                const monthlyInterestRate = annualInterestRate / 12
                const numberOfPayments = numberOfYears * 12
                const monthlyRepayment = (principal * monthlyInterestRate) / (1 - Math.pow((1 + monthlyInterestRate), -numberOfPayments))
                console.log(monthlyRepayment)

                setTotal(monthlyRepayment)
            } else if (form.type === 'intereset_only') {
                // Calculate interest-only monthly repayment
                const interestOnlyRepayment = (principal * annualInterestRate) / 12
                console.log(interestOnlyRepayment)

                setTotal(interestOnlyRepayment)
            }
        } else {
            setTotal(null)
        }
    }

    useEffect(() => {
        setTotal(null)
    }, [form])

    return (
        <>
            <main className="bg-white lg:rounded-[1.25rem] shadow-md lg:min-w-[50vw] lg:max-w-[85vw] 2xl:max-w-[60vw] h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                    <div className="p-[2.1rem] h-full flex flex-col gap-[2.25rem]">
                        <div className="flex items-center justify-between gap-[1.25rem]">
                            <h1 className="font-[700] text-[1.375rem] text-[#133040]">Mortgage Amount</h1>
                            <button 
                                className="text-[0.95rem] text-[#6c8ca4] underline font-[500]"
                                onClick={() => {
                                    setForm({
                                        amount: 0,
                                        term: 0,
                                        rate: 0,
                                        type: ''
                                    })
                                    setEmptyFields([])
                                }}
                            >
                                Clear all
                            </button>
                        </div>
                        <div className="flex flex-col gap-[1.35rem]">
                            <div className="flex flex-col gap-[0.75rem]">
                                <label 
                                    htmlFor="amount"
                                    className="text-[0.925rem]"
                                >
                                    Mortgage Amount
                                </label>
                               <div 
                                    className="w-full border-[1px] border-[#818d94] flex rounded-[0.5rem]"
                                    style={focusedInput === "amount" ? { borderColor: '#f3f330' } : emptyFields.includes("amount") ? { borderColor: '#d73328' } : { }}
                                >
                                    <div 
                                        className="py-[0.695rem] px-[1.175rem] bg-[#e3f4fc] text-[#506a77] rounded-tl-[0.5rem] rounded-bl-[0.5rem] border-[#7e8d97] font-[700]"
                                        style={focusedInput === "amount" ? { backgroundColor: '#f3f330'} : emptyFields.includes("amount") ? { backgroundColor: '#d73328', color: 'white' } : {}}
                                    >
                                        £
                                    </div>
                                    <input 
                                        type="text" 
                                        className="w-full outline-none pl-[0.75rem] rounded-[0.5rem] font-[700]" 
                                        id="amount"
                                        onFocus={() => handleFocus('amount')}
                                        onBlur={handleBlur}
                                        value={form.amount}
                                        onChange={(e) => {
                                            setForm({
                                                ...form,
                                                amount: e.target.value
                                            })
                                        }}
                                    />
                               </div>
                               {emptyFields.includes("amount") && ( <p className="text-[0.85rem] text-[#d73328]">This field is required</p> )}
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.65rem]">
                                <div className="flex flex-col gap-[0.75rem]">
                                    <label 
                                        htmlFor="term"
                                        className="text-[0.925rem]"
                                    >
                                        Mortgage Term
                                    </label>
                                    <div 
                                        className="w-full border-[1px] border-[#818d94] flex rounded-[0.5rem]"
                                        style={focusedInput === "term" ? { borderColor: '#f3f330' } : emptyFields.includes("term") ? { borderColor: '#d73328' } : { }}
                                    >
                                        <input 
                                            type="text" 
                                            className="w-full outline-none pl-[0.75rem] rounded-[0.5rem] font-[700]" 
                                            id="term"
                                            onFocus={() => handleFocus('term')}
                                            onBlur={handleBlur}
                                            value={form.term}
                                            onChange={(e) => {
                                                setForm({
                                                    ...form,
                                                    term: e.target.value
                                                })
                                            }}
                                        />
                                        <div 
                                            className="py-[0.695rem] px-[1.175rem] bg-[#e3f4fc] text-[#506a77] rounded-tr-[0.5rem] rounded-br-[0.5rem] border-[#7e8d97] font-[700]"
                                            style={focusedInput === "term" ? { backgroundColor: '#f3f330'} : emptyFields.includes("term") ? { backgroundColor: '#d73328', color: 'white' } : {}}
                                        >
                                            years
                                        </div>
                                    </div>
                                    {emptyFields.includes("term") && ( <p className="text-[0.85rem] text-[#d73328]">This field is required</p> )}
                                </div>
                                <div className="flex flex-col gap-[0.75rem]">
                                    <label 
                                        htmlFor="rate"
                                        className="text-[0.925rem]"
                                    >
                                        Interest Rate
                                    </label>
                                    <div 
                                        className="w-full border-[1px] border-[#818d94] flex rounded-[0.5rem]"
                                        style={focusedInput === "rate" ? { borderColor: '#f3f330' } : emptyFields.includes("rate") ? { borderColor: '#d73328' } : { }}
                                    >
                                        <input 
                                            type="text" 
                                            className="w-full outline-none pl-[0.75rem] rounded-[0.5rem] font-[700]" 
                                            id="rate"
                                            onFocus={() => handleFocus('rate')}
                                            onBlur={handleBlur}
                                            value={form.rate}
                                            onChange={(e) => {
                                                setForm({
                                                    ...form,
                                                    rate: e.target.value
                                                })
                                            }}
                                        />
                                        <div 
                                            className="py-[0.695rem] px-[1.175rem] bg-[#e3f4fc] text-[#506a77] rounded-tr-[0.5rem] rounded-br-[0.5rem] border-[#7e8d97] font-[700]"
                                            style={focusedInput === "rate" ? { backgroundColor: '#f3f330'} : emptyFields.includes("rate") ? { backgroundColor: '#d73328', color: 'white' } : {}}
                                        >
                                            %
                                        </div>
                                    </div>
                                    {emptyFields.includes("rate") && ( <p className="text-[0.85rem] text-[#d73328]">This field is required</p> )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-[0.75rem]">
                                <span
                                    className="text-[0.925rem]"
                                >
                                    Mortgage Type
                                </span>
                                <div 
                                    className="w-full border-[1px] border-[#818d94] flex rounded-[0.5rem] py-[0.695rem] px-[1.125rem] items-center gap-[1.35rem] font-[700] cursor-pointer hover:border-[#f3f330]"
                                    style={form.type === "repayment" ? { backgroundColor: '#fafae0', borderColor: '#f3f330' } : {}}
                                    onClick={() => {
                                        if (form.type === "repayment") {
                                            setForm({
                                                ...form,
                                                type: ''
                                            })
                                        } else {
                                            setForm({
                                                ...form,
                                                type: 'repayment'
                                            })
                                        }
                                    }}
                                >
                                    <input 
                                        type="radio" 
                                        className="w-[18px] h-[18px]"
                                        checked={form.type === "repayment"}
                                    />
                                    Repayment
                                </div>
                                <div 
                                    className="w-full border-[1px] border-[#818d94] flex rounded-[0.5rem] py-[0.695rem] px-[1.125rem] items-center gap-[1.35rem] font-[700] cursor-pointer hover:border-[#f3f330]"
                                    style={form.type === "intereset_only" ? { backgroundColor: '#fafae0', borderColor: '#f3f330' } : {}}
                                    onClick={() => {
                                        if (form.type === "intereset_only") {
                                            setForm({
                                                ...form,
                                                type: ''
                                            })
                                        } else {
                                            setForm({
                                                ...form,
                                                type: 'intereset_only'
                                            })
                                        }
                                    }}
                                >
                                    <input 
                                        type="radio" 
                                        className="w-[18px] h-[18px]"
                                        checked={form.type === "intereset_only"}
                                    />
                                    Intereset Only
                                </div>
                                {emptyFields.includes("type") && ( <p className="text-[0.85rem] text-[#d73328]">This field is required</p> )}
                            </div>
                            <button
                                className="py-[0.85rem] px-[1.85rem] bg-[#f3f330] justify-center lg:justify-start rounded-[3rem] w-full lg:w-fit font-[700] mt-[1rem] flex items-center gap-[1rem] text-[0.985rem]"
                                onClick={handleCalculation}
                            >
                                <img src="assets/images/icon-calculator.svg" alt="calculator" />
                                Calculate Repayments
                            </button>
                        </div>
                    </div>
                    {!total ? (
                         <div className="bg-[#133040] h-full lg:rounded-tr-[1.25rem] lg:rounded-br-[1.25rem] lg:rounded-bl-[6rem] flex items-center justify-center p-[2.1rem]">
                            <div className="flex flex-col gap-[1.25rem] text-center items-center justify-center">
                                <img src="assets/images/illustration-empty.svg" alt="empty" className="max-w-[175px]" />
                                <h2 className="text-white text-[1.425rem] font-[700]">Results shown here</h2>
                                <p className="text-[#9db6c4] font-[500] text-[0.975rem] leading-[1.825]">Complete the form and click “calculate repayments” to see what 
                                your monthly repayments would be.</p>
                            </div>
                         </div>
                    ) : (
                        <div className="bg-[#133040] h-full lg:rounded-tr-[1.25rem] lg:rounded-br-[1.25rem] lg:rounded-bl-[6rem] flex flex-col gap-[1.25rem] p-[2.1rem]">
                            <h1 className="font-[700] text-[1.3rem] text-white">Your results</h1>
                            <p className="text-slate-400 text-[0.955rem] font-[500] leading-[1.65]">Your results are shown below based on the information you provided. 
                            To adjust the results, edit the form and click “calculate repayments” again.</p>
                            <div className="bg-[#0e2431] p-[1.45rem] border-[3px] border-[#0e2431] border-t-[#f3f330] rounded-[0.5rem] lg:mt-[1.15rem] flex flex-col gap-[0.75rem]">
                                <h2 className="text-[0.915rem] font-[400] text-neutral-200">{form.type === "repayment" ? 'Your monthly repayments' : 'Your monthly interesets'}</h2>
                                <h1 className="font-[700] text-[2.95rem] text-[#f3f330]">
                                    £{Number(total).toFixed(2)}
                                </h1>
                                <hr className="border-t-[1px] border-t-slate-500 my-[1.25rem]" />
                                <h2 className="text-[0.915rem] font-[400] text-neutral-200">Total you'll repay over the term</h2>
                                <p className="text-[1.4rem] font-[700] text-white">£{(Number(total)*form.term).toFixed(2)}</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>  
        </>
    )
}

export default App