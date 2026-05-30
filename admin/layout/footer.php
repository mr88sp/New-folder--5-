        </main>
        
        <!-- Footer -->
        <footer class="bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-500">
            <div class="container mx-auto">
                <p>&copy; <?php echo date("Y"); ?> تمامی حقوق محفوظ است.</p>
                <p class="mt-1 text-xs text-gray-400">طراحی و توسعه توسط <span class="font-semibold text-emerald-500">Trae AI</span></p>
            </div>
        </footer>
    </div>
</div>

<script>
    // Toggle sidebar on mobile
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('aside');
    
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
        sidebar.classList.toggle('flex');
        sidebar.classList.toggle('absolute');
        sidebar.classList.toggle('inset-y-0');
        sidebar.classList.toggle('left-0');
        sidebar.classList.toggle('w-64');
        sidebar.classList.toggle('bg-gray-900');
        sidebar.classList.toggle('z-50');
    });
</script>

</body>
</html>
