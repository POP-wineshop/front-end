const PaymentMethod = () => {
  const paymentMethodOption = [
    '신용카드',
    '카카오페이',
    '네이버페이',
    '휴대폰 소액결제',
  ];
  return (
    <>
      <div className="payment-method w-1/2 flex flex-col gap-3">
        <div className="payment-method-header">
          <p className="text-2xl font-bold">결제 수단</p>
        </div>
        <hr />
        <div className="payment-method-select flex flex-col w-full px-3 mx-auto">
          {paymentMethodOption.map((paymentMethod, index) => (
            <div
              className="payment-method-option flex gap-6 border px-4 py-2"
              key={index}
            >
              <input type="radio" id={paymentMethod} />
              <label>{paymentMethod}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
