export default class PDFJs{
    init = (source, element) => {
        const iframe = document.createElement('iframe');
        iframe.title = source
        //TROCAR PARA O ENDEREÇO DO PROXY
        iframe.src = `http://localhost:5000/api/pdfAula?fileName=${source}`;
        iframe.width = '100%';
        iframe.height = '1000px';
        element.appendChild(iframe);
    }
}