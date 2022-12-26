<style>
    body {
        font-family: DejaVu Sans, sans-serif !important;
        background-color: white;
        color: black;
    }

    .font-16 {
        font-size: 12px;
    }
</style>

<div>
    <div class="d-flex">
        <div><img src="data:image/png;base64,{{ base64_encode(file_get_contents(public_path('storage/logo.png'))) }}" alt=""></div>
        <div style="margin-left: 180px; font-size: 12px;margin-top:-100px">
            SSKPI là một trong những công ty công nghệ hàng đầu Châu Á, bao gồm nhiều dịch vụ và mô hình làm việc đa dạng, chuyên nghiệp ở các lĩnh vực công nghệ hybrid, ứng dụng blockchain hay trí tuệ nhân tạo theo quy chuẩn Nhật Bản.
        </div>
    </div>
</div>

<div style="text-align: center; color: #06007A">
    <div style="font-size: 30px; margin-top:30px">
        <b>{{$job->title}}</b>
    </div>
    <div>
        {{$job->position}}
    </div>
</div>

<div>
    <div style="color: #070085;"><b>MÔ TẢ CÔNG VIỆC</b></div>
    <div style="margin-left: 36px; color: black;" class="font-16">
        <?= $job->description ?>
        <p class="font-16">
            - Mức lương: {{$job->wage}}
        </p>
        <p class="font-16">
            - Địa điểm làm việc: {{$job->location}}
        </p>
    </div>
</div>
<div>
    <div style="color: #070085;"><b>YÊU CẦU</b></div>
    <div style="margin-left: 36px; color: black;" class="font-16">
        <?= $job->request ?>
    </div>
</div>
<div>
    <div style="color: #070085;"><b>QUYỀN LỢI</b></div>
    <div style="color: black;margin-left: 36px;" class="font-16">
        <p>- Cung cấp máy tính & trang thiết bị hiện đại</p>
        <p>- Được tham gia các Câu lạc bộ dưới sự tài trợ chính thức của Công ty: CLB Bóng đá, cầu
            lông, tiếng anh …</p>
        <p>- Tiếp xúc dự án phát triển sản phẩm nội bộ của công ty với quy trình chuẩn và kỹ thuật phổ
            biến nhất hiện nay.</p>

    </div>
</div>
<div>
    <div style="color: #070085;"><b>CÁCH THỨC ỨNG TUYỂN</b></div>
    <div style="color: black;margin-left: 36px;" class="font-16">
        <p>- Mail: sskpi.7.2021@gmail.com</p>
        <p>- Hotline: 0971403754</p>
        <p>- Fanpage: https://www.facebook.com/tuyendungSSKPI</p>
    </div>
</div>