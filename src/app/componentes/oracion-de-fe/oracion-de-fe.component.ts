import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Persona } from '../../models/Persona';
import { PersonaService } from '../../services/persona/persona.service';

@Component({
  selector: 'app-oracion-de-fe',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './oracion-de-fe.component.html',
  styleUrl: './oracion-de-fe.component.css'
})
export class OracionDeFeComponent implements OnInit{

  oracionDeFeForm: FormGroup;
  personas: Persona[] = []; // Lista de personas que se registraron hoy

  constructor(
    private personaService: PersonaService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Inicializamos el formulario
    this.oracionDeFeForm = this.fb.group({
      // Solo inicializamos oraciondefe, ya que los otros campos son de solo lectura
      oraciondefe: [false, Validators.required] 
    });
  }

  ngOnInit(): void {
    this.cargarPersonasHoy();
  }

  cargarPersonasHoy(): void {
    this.personaService.findAllByFecha().subscribe({
      next: (personas) => {
        this.personas = personas;
      },
      error: (err) => {
        console.error('Error al cargar las personas', err);
      }
    });
  }

  actualizarOracionDeFe(persona: Persona): void {
    // Obtenemos el estado actualizado del checkbox
    persona.oraciondefe = this.oracionDeFeForm.get('oraciondefe')?.value;

    // Ahora enviamos todos los datos de la persona, no solo oraciondefe
    this.personaService.findByIdAndFechaHoy(persona.id, persona).subscribe({
      next: (response) => {
        console.log(`Persona con ID ${persona.id} actualizada`, response);
      },
      error: (err) => {
        console.error('Error al actualizar la persona', err);
      }
    });
  }
}
