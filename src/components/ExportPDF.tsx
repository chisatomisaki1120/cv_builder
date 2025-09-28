'use client';

import { useState } from 'react';
import { Download, Loader } from 'lucide-react';
import { CVData } from '@/lib/cvData';

interface ExportPDFProps {
    cvData: CVData;
}

export default function ExportPDF({ cvData }: ExportPDFProps) {
    const [isExporting, setIsExporting] = useState(false);
    const [exportSuccess, setExportSuccess] = useState(false);

    const exportToPDF = async () => {
        setIsExporting(true);

        try {
            await exportWithJsPDF();
        } catch (error) {
            console.error('Export failed:', error);
            const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi export PDF';
            alert(errorMessage + '. Vui lòng thử lại hoặc liên hệ hỗ trợ.');
        } finally {
            setIsExporting(false);
        }
    };

    const exportWithJsPDF = async () => {
        // Kiểm tra môi trường browser
        if (typeof window === 'undefined') {
            throw new Error('PDF export chỉ hoạt động trong browser');
        }

        // Dynamic import jsPDF và html2canvas-pro
        const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
            import('jspdf'),
            import('html2canvas-pro')
        ]);

        // Tìm element chứa CV content
        const element = document.getElementById('cv-content');
        if (!element) {
            throw new Error('Không tìm thấy nội dung CV để export');
        }

        // Tạm thời ẩn fixed elements
        const fixedElements = document.querySelectorAll('.fixed');
        fixedElements.forEach(el => {
            (el as HTMLElement).style.display = 'none';
        });

        // Render canvas với html2canvas-pro - full width PDF
        const canvas = await html2canvas(element, {
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            width: element.scrollWidth, // Use actual content width
            height: element.scrollHeight,
            scale: 3, // Higher quality for better PDF output
            removeContainer: true, // html2canvas-pro specific option
            foreignObjectRendering: false, // Better text rendering
            imageTimeout: 0, // No timeout for image loading
            onclone: function (clonedDoc: Document) {
                // Optimize cloned document for PDF rendering - full width with minimal padding
                const clonedElement = clonedDoc.getElementById('cv-content');
                if (clonedElement) {
                    clonedElement.style.width = '100%';
                    clonedElement.style.maxWidth = 'none';
                    clonedElement.style.padding = '20px';
                    clonedElement.style.margin = '0';
                }
            }
        });

        // Khôi phục fixed elements
        fixedElements.forEach(el => {
            (el as HTMLElement).style.display = '';
        });

        // Tạo PDF với full width
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        const pdfWidth = 210; // A4 width in mm

        // Calculate dimensions to fill the entire PDF width without margins
        const aspectRatio = canvas.height / canvas.width;
        const imgWidth = pdfWidth; // Use full PDF width
        const imgHeight = pdfWidth * aspectRatio;

        // Nếu content cao hơn một trang, chia thành nhiều trang full size
        const availablePageHeight = 297; // Full page height

        if (imgHeight > availablePageHeight) {
            let position = 0;

            while (position < imgHeight) {
                const remainingHeight = imgHeight - position;
                const currentHeight = Math.min(availablePageHeight, remainingHeight);

                // Tạo canvas cho trang hiện tại
                const pageCanvas = document.createElement('canvas');
                const pageCtx = pageCanvas.getContext('2d');
                const sourceY = (position * canvas.height) / imgHeight;
                const sourceHeight = (currentHeight * canvas.height) / imgHeight;

                pageCanvas.width = canvas.width;
                pageCanvas.height = sourceHeight;

                if (pageCtx) {
                    pageCtx.drawImage(canvas, 0, sourceY, canvas.width, sourceHeight, 0, 0, canvas.width, sourceHeight);
                    const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.98);

                    if (position > 0) {
                        pdf.addPage();
                    }
                    // Add image full size without margins
                    pdf.addImage(pageImgData, 'JPEG', 0, 0, imgWidth, currentHeight);
                }

                position += availablePageHeight;
            }
        } else {
            // Single page full size without margins
            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        }

        // Lưu file
        const fileName = `CV_${cvData.personalInfo.name.replace(/\s+/g, '_')}.pdf`;
        pdf.save(fileName);

        // Hiển thị thông báo thành công
        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 3000);
    };


    return (
        <>
            <div className="relative">
                <div className="flex flex-col gap-1">
                    <button
                        onClick={exportToPDF}
                        disabled={isExporting}
                        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
                    >
                        {isExporting ? (
                            <>
                                <Loader className="animate-spin" size={20} />
                                Đang tạo PDF...
                            </>
                        ) : (
                            <>
                                <Download size={20} />
                                Tải PDF
                            </>
                        )}
                    </button>
                </div>

                {exportSuccess && (
                    <div className="absolute top-full mt-2 left-0 right-0 bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded text-sm animate-fade-in z-50">
                        ✅ PDF đã được tải xuống!
                    </div>
                )}
            </div>

            {/* Loading Overlay */}
            {isExporting && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm mx-4 text-center">
                        <div className="mb-4">
                            <Loader className="animate-spin mx-auto text-green-500" size={40} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Đang tạo PDF</h3>
                        <p className="text-gray-600 text-sm">Vui lòng đợi trong giây lát...</p>
                        <div className="mt-4 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}