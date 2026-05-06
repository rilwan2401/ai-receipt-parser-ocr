import { useState } from "react";
import axios from "axios";

type ReceiptItem = {
  name: string;
  amount: number;
};

type ReceiptData = {
  merchant: string;
  date: string;
  items: ReceiptItem[];
  total: number;
  warnings?: string[];
};

function App() {
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [receipt, setReceipt] =
    useState<ReceiptData | null>(null);

  const [saveMessage, setSaveMessage] =
    useState("");

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("receipt", file);

      const response = await axios.post(
        "http://localhost:5000/api/parse",
        formData
      );

      setReceipt(response.data);
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.error ||
          error.message ||
          "Failed to parse receipt"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!receipt) return;

    try {
      await axios.post(
        "http://localhost:5000/api/receipts",
        receipt
      );

      setSaveMessage(
        "Receipt saved successfully"
      );
    } catch (error) {
      console.error(error);

      alert("Failed to save receipt");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #eef2ff, #f8fafc)",
        padding: "50px 20px",
        fontFamily:
          "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "950px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "40px",
            boxShadow:
              "0 20px 60px rgba(15, 23, 42, 0.08)",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              marginBottom: "35px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 14px",
                borderRadius: "999px",
                background: "#dbeafe",
                color: "#1d4ed8",
                fontSize: "13px",
                fontWeight: 700,
                marginBottom: "16px",
              }}
            >
              AI Receipt Extraction Workflow
            </div>

            <h1
              style={{
                fontSize: "42px",
                margin: 0,
                color: "#0f172a",
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              Receipt Parser
            </h1>

            <p
              style={{
                marginTop: "16px",
                color: "#64748b",
                fontSize: "17px",
                lineHeight: 1.7,
                maxWidth: "700px",
              }}
            >
              Upload receipt images, extract structured
              transaction data, review uncertain fields,
              and correct parsing results before saving.
            </p>
          </div>

          <div
            style={{
              border: "2px dashed #cbd5e1",
              borderRadius: "20px",
              padding: "40px",
              background: "#f8fafc",
              textAlign: "center",
              marginBottom: "35px",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                marginBottom: "16px",
              }}
            >
              📄
            </div>

            <h3
              style={{
                marginBottom: "12px",
                color: "#0f172a",
              }}
            >
              Upload Receipt Image
            </h3>

            <p
              style={{
                color: "#64748b",
                marginBottom: "24px",
              }}
            >
              Supports JPG and PNG receipt images
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFile(e.target.files[0]);
                }
              }}
              style={{
                marginBottom: "20px",
              }}
            />

            <br />

            <button
              onClick={handleUpload}
              disabled={loading}
              style={{
                background:
                  "linear-gradient(to right, #2563eb, #4f46e5)",
                color: "white",
                border: "none",
                padding: "14px 28px",
                borderRadius: "14px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: 700,
                boxShadow:
                  "0 10px 20px rgba(37,99,235,0.25)",
              }}
            >
              {loading
                ? "Processing Receipt..."
                : "Upload & Extract Data"}
            </button>
          </div>

          {receipt && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "25px",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "28px",
                      color: "#0f172a",
                    }}
                  >
                    Review & Correct
                  </h2>

                  <p
                    style={{
                      marginTop: "8px",
                      color: "#64748b",
                    }}
                  >
                    Verify extracted fields before saving.
                  </p>
                </div>

                <div
                  style={{
                    background: "#dcfce7",
                    color: "#166534",
                    padding: "8px 14px",
                    borderRadius: "999px",
                    fontWeight: 700,
                    fontSize: "13px",
                  }}
                >
                  Extraction Complete
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>
                  Merchant Name
                </label>

                <input
                  type="text"
                  value={receipt.merchant}
                  onChange={(e) =>
                    setReceipt({
                      ...receipt,
                      merchant: e.target.value,
                    })
                  }
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>
                  Receipt Date
                </label>

                <input
                  type="text"
                  value={receipt.date}
                  onChange={(e) =>
                    setReceipt({
                      ...receipt,
                      date: e.target.value,
                    })
                  }
                  placeholder="Enter date"
                  style={inputStyle}
                />
              </div>

              <div
                style={{
                  marginBottom: "24px",
                }}
              >
                <h3
                  style={{
                    color: "#0f172a",
                    marginBottom: "18px",
                  }}
                >
                  Line Items
                </h3>

                <div
                  style={{
                    display: "grid",
                    gap: "14px",
                  }}
                >
                  {receipt.items.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: "14px",
                        background: "#f8fafc",
                        padding: "16px",
                        borderRadius: "14px",
                        border:
                          "1px solid #e2e8f0",
                      }}
                    >
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => {
                          const updatedItems = [
                            ...receipt.items,
                          ];

                          updatedItems[index].name =
                            e.target.value;

                          setReceipt({
                            ...receipt,
                            items: updatedItems,
                          });
                        }}
                        style={{
                          ...inputStyle,
                          flex: 1,
                          background: "white",
                        }}
                      />

                      <input
                        type="number"
                        value={item.amount}
                        onChange={(e) => {
                          const updatedItems = [
                            ...receipt.items,
                          ];

                          updatedItems[index].amount =
                            Number(e.target.value);

                          setReceipt({
                            ...receipt,
                            items: updatedItems,
                          });
                        }}
                        style={{
                          ...inputStyle,
                          width: "150px",
                          background: "white",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  marginBottom: "24px",
                }}
              >
                <label style={labelStyle}>
                  Total Amount
                </label>

                <input
                  type="number"
                  value={receipt.total}
                  onChange={(e) =>
                    setReceipt({
                      ...receipt,
                      total: Number(e.target.value),
                    })
                  }
                  style={{
                    ...inputStyle,
                    width: "240px",
                  }}
                />
              </div>

              {receipt.warnings &&
                receipt.warnings.length > 0 && (
                  <div
                    style={{
                      background: "#fff7ed",
                      border:
                        "1px solid #fdba74",
                      padding: "18px",
                      borderRadius: "16px",
                      marginBottom: "24px",
                    }}
                  >
                    <h3
                      style={{
                        marginTop: 0,
                        color: "#9a3412",
                      }}
                    >
                      Warnings
                    </h3>

                    <ul
                      style={{
                        color: "#7c2d12",
                      }}
                    >
                      {receipt.warnings.map(
                        (warning, index) => (
                          <li key={index}>{warning}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <button
                  onClick={handleSave}
                  style={{
                    background:
                      "linear-gradient(to right, #16a34a, #15803d)",
                    color: "white",
                    border: "none",
                    padding: "14px 28px",
                    borderRadius: "14px",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: "15px",
                    boxShadow:
                      "0 10px 20px rgba(22,163,74,0.25)",
                  }}
                >
                  Save Corrected Receipt
                </button>

                {saveMessage && (
                  <div
                    style={{
                      color: "#166534",
                      fontWeight: 700,
                    }}
                  >
                    {saveMessage}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: 700,
  color: "#0f172a",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box" as const,
  color: "#0f172a",
  background: "white",
};

export default App;
