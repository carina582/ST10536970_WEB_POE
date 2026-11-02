document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 2.1 Interactive Elements: Accordion (FAQ)
    // ==========================================
    // Exemplo: Adicionar um Accordion na página Contacto ou About
    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    // ==========================================
    // 2.2 Dynamic Content: Search functionality
    // ==========================================
    // Filtro de pesquisa para o Menu
    const searchInput = document.getElementById('menuSearch');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const filter = this.value.toLowerCase();
            const menuItems = document.querySelectorAll('.menu-item');

            menuItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const desc = item.querySelector('.description').textContent.toLowerCase();
                
                if (title.includes(filter) || desc.includes(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // ==========================================
    // 3.2 AJAX Form Submission & 4. Form Validation
    // ==========================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Previne o envio normal

            // Validação Client-Side Simples
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#D32F2F'; // Vermelho para erro
                } else {
                    input.style.borderColor = '#E8F5E9'; // Restaura a cor normal
                }
            });

            if (!isValid) {
                alert('Please fill in all required fields correctly.');
                return;
            }

            // AJAX Submission (Simulação com Fetch)
            // Num cenário real, o URL seria o endpoint do servidor (ex: PHP, Node.js)
            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Simula uma resposta de sucesso do servidor
                alert('Thank you! Your message has been sent successfully (AJAX simulated).');
                form.reset(); // Limpa o formulário
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    });
});