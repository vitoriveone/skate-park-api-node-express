document.addEventListener("DOMContentLoaded", () => {
    //TODO poner la URL global
    const URL_BASE = 'http://localhost:3000';
    const URL_API = `${URL_BASE}/api/v1`;


    const formLogin = document.querySelector('#loginForm');
    const formRegister = document.querySelector('#registerForm');
    const btnLogout = document.querySelector('#btnLogout');
    const btnEliminar = document.querySelector('#btnEliminar');
    const btnActualizar = document.querySelector('#btnActualizar');

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

    const eliminarSkater = async (id)=>{
        try{
            const response = await axios({
              method: 'delete',
              url: `${URL_API}/skater/`,
              params: {
                id
              }
            }
          );
          window.location.href = `${URL_BASE}/admin/skaters`;

          }catch(err){
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.message
            });
          }
    }


    const editarSkater = async (id, nombre, password, passwordRepeat, anos_experiencia, especialidad)=>{
        //TODO validar password
        try{
            const response = await axios({
              method: 'put',
              url: `${URL_API}/skater/`,
              data: {
                id, 
                nombre, 
                password, 
                anos_experiencia,
                especialidad
              }
            }
        );
        window.location.href = `${URL_BASE}/admin/skaters`;
    }catch(err){
            console.log(err);
        }
    }

    if(btnActualizar){
        btnActualizar.addEventListener('click',(e)=>{
            e.preventDefault();
            const nombre = document.querySelector('#updateNombre').value;
            const password = document.querySelector('#updatePassword').value;
            const passwordRepeat = document.querySelector('#updatePasswordRepeat').value;
            const aniosExperiencia = document.querySelector('#updateAniosExp').value;
            const especialidad= document.querySelector('#updateEspecialidad').value;      
            const id = e.target.getAttribute("data-id");
            editarSkater(id, nombre, password, passwordRepeat, aniosExperiencia, especialidad);
        })
    }

    if(btnEliminar){
        btnEliminar.addEventListener('click',(e)=>{
            e.preventDefault();
            const id = e.target.getAttribute("data-id");
            eliminarSkater(id);
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


    const setStatus = async (id)=>{
        axios({
            method: 'put',
            url: `${URL_API}/skater/status`,
            data: {
                id
            }
        })
        .then(res => {
            console.log(res.data);
        });
    }

    const agregarEventoABotones = () => {

        const checksEdir = document.querySelectorAll("[id*='chkStatus-']");

        if(checksEdir){
            checksEdir.forEach((check) => {
                check.addEventListener("click", () => {
                    const id = check.getAttribute("data-id");
                    setStatus(id);
                });
            });
        }

        const botonesUpdate = document.querySelectorAll("[id*='edtSkt-']");
        
        if(botonesUpdate){
            botonesUpdate.forEach((boton) => {
                boton.addEventListener("click", () => {
                    const id = boton.getAttribute("data-id");
                    window.location.href = `${URL_BASE}/admin/skater/edit?id=${id}`;
                });
            });
        }

   };
    agregarEventoABotones();
});