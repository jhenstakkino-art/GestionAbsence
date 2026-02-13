import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
import io

@csrf_exempt
@require_http_methods(["POST"])
def tauxPresence(request):
    try:
        #  JSON AVY AMIN'NY frontend
        data = json.loads(request.body)
        
        tauxPresent = data.get('tauxPresent', 0)
        tauxAbsent = data.get('tauxAbsent', 0)
        tauxRetard = data.get('tauxRetard', 0)
        
        # DATA MIDITRA graphique
        statut = ["Présence", "Absence", "Retard"]
        taux = [tauxPresent, tauxAbsent, tauxRetard]
        
        # Créer le graphique pie
        plt.pie(taux, labels=statut, autopct='%1.1f%%', startangle=140)
        plt.title('Taux de Présence')
        
        # STOCKENA
        buffer = io.BytesIO()
        plt.savefig(buffer, format="png", bbox_inches='tight', dpi=100)
        plt.close()
        buffer.seek(0)
        
        # ITO NO MAMERINA ANAZY HO LASA SARY FORMDT PNG
        return HttpResponse(buffer.getvalue(), content_type="image/png")
    
    except Exception as e:
        return HttpResponse(f"Erreur: {str(e)}", status=400)


def diagramme(request):
    
    mention = ["L1", "L2", "L3"]
    values = [10, 22, 5]

    plt.bar(mention, values, color=('green','red', 'yellow'))

    plt.xlabel("Mention")
    plt.ylabel("Taux")

    plt.title("Diagramme en batton")
    
    stock = io.BytesIO()
    plt.savefig(stock, format="png", bbox_inches = 'tight', dpi=100)
    plt.close()
    stock.seek(0)

    return HttpResponse(stock.getvalue(), content_type="diagramme/png")



