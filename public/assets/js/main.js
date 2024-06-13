document.addEventListener("DOMContentLoaded", () => {
    //TODO poner la URL global

    const formLogin = document.querySelector('#loginForm');
    const formRegister = document.querySelector('#registerForm');
    const btnLogout = document.querySelector('#btnLogout');

    const login = (email, password) =>{
        axios({
            method: 'post',
            url: '/login',
            data: {
                email,
                password
            }
        })
        .then(res => {
            const { data , message } = res.data;
            if(data.token){
                localStorage.setItem('token', JSON.stringify(`${data.token}`));
                window.location.href = `/admin/skaters`;
            }else{
                Swal.fire({
                    icon: "warning",
                    title: 'Login',
                    text: message
                  });
            }
            
        });
    }

    const register = (email,nombre, password, passwordRepeat, anos_experiencia, especialidad, foto)=>{
        //TODO validacion de password
        axios({
            method: 'post',
            url: '/register',
            data: {
                email,
                nombre,
                password,
                anos_experiencia,
                especialidad,
                foto
            }
        })
        .then(res => {
            if(res.data){
                console.log(res.data);
                //localStorage.setItem('token', JSON.stringify(`${res.data}`));
                //window.location.href = `/?token=${res.data}`;
            }else{
                Swal.fire({
                    icon: "error",
                    title: 'Login',
                    text: 'Usuario o contraseña incorrectos.'
                  });
            }
            
        });
    }

    const logOut = ()=> {
        axios({
            method: 'post',
            url: '/login/out'
        })
        .then(res => {
            console.log(res);
        })
    }

    if(btnLogout){
        btnLogout.addEventListener('click',(e)=>{
            e.preventDefault();
            logOut();
        })
    }

    if(formRegister){
    formRegister.addEventListener('submit',(e)=>{
        e.preventDefault();
        const email = document.querySelector('#registerEmail').value;
        const nombre = document.querySelector('#registerNombre').value;
        const password = document.querySelector('#registerPassword').value;
        const passwordRepeat = document.querySelector('#registerPasswordRepeat').value;
        const aniosExperiencia = document.querySelector('#registerAniosExp').value;
        const especialidad= document.querySelector('#registerEspecialidad').value;
        //TODO Agreagr la foto despues
        register(email,nombre, password, passwordRepeat, aniosExperiencia, especialidad, '');
    })};

    if(formLogin){
    formLogin.addEventListener('submit',(e)=>{
        e.preventDefault();
        const email = document.querySelector('#loginEmail').value;
        const password = document.querySelector('#loginPass').value;
        console.log(email, password);
        login(email, password);
    })};
});