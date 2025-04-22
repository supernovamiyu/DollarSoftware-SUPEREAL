import '@testing-library/jest-dom';

const mockJsPdfInstance = {
    setProperties: jest.fn(),
    setFontSize: jest.fn(),
    setTextColor: jest.fn(),
    text: jest.fn(),
    setDrawColor: jest.fn(),
    setLineWidth: jest.fn(),
    line: jest.fn(),
    addImage: jest.fn(),
    autoTable: jest.fn(),
    splitTextToSize: jest.fn().mockImplementation((text) => [text]),
    setFont: jest.fn(),
    save: jest.fn(),
    lastAutoTable: { finalY: 100 },
    internal: { pageSize: { height: 300 } }
};

global.window = {
    ...global.window,
    jspdf: { 
        jsPDF: jest.fn().mockImplementation(() => mockJsPdfInstance)
    },
    dispatchEvent: jest.fn(),
    addEventListener: jest.fn()
};

global.document = {
    ...global.document,
    addEventListener: jest.fn(),
    querySelectorAll: jest.fn().mockReturnValue([]),
    querySelector: jest.fn(),
    getElementById: jest.fn()
};