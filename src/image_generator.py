import matplotlib.pyplot as plt
import io

def generate_image(problem_type, variables, question):
    if problem_type == "割合" and "全体" in variables and "割合" in variables:
        total = variables["全体"]
        ratio = variables["割合"]
        part = total * ratio

        fig, ax = plt.subplots()
        ax.pie([part, total - part], labels=["求める部分", "残り"], autopct='%1.1f%%')
        ax.set_title(question)

        buf = io.BytesIO()
        fig.savefig(buf, format='png')
        plt.close(fig)
        buf.seek(0)
        return buf  # 🔴 Image じゃなくて buf を返す！

    raise ValueError("未対応の問題タイプです")
